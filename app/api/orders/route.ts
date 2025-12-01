import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
const body = await req.json();
const { user_id, items } = body;

const total = items.reduce((s: number, p: any) => s + p.price * p.quantity, 0);

const [order] = await db.query(
"INSERT INTO orders (user_id, total) VALUES (?, ?)",
[user_id, total]
);

const orderId = (order as any).insertId;

for (const item of items) {
await db.query(
"INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?,?,?,?)",
[orderId, item.id, item.quantity, item.price]
);
}

return NextResponse.json({ success: true, orderId });
}