import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
const { searchParams } = new URL(req.url);
const productId = searchParams.get("product_id");

if (!productId) return NextResponse.json([]);

const [rows] = await db.query(
"SELECT * FROM reviews WHERE product_id = ?",
[productId]
);

return NextResponse.json(rows);
}

export async function POST(req: Request) {
const body = await req.json();
const { product_id, user_id, rating, comment } = body;

await db.query(
"INSERT INTO reviews (product_id, user_id, rating, comment) VALUES (?,?,?,?)",
[product_id, user_id, rating, comment]
);

return NextResponse.json({ success: true });
}