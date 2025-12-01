import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
const { name, email, password } = await req.json();

await db.query(
"INSERT INTO users (name, email, password) VALUES (?,?,?)",
[name, email, password]
);

return NextResponse.json({ success: true });
}