import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
const { searchParams } = new URL(req.url);
const category = searchParams.get("category");

let query = "SELECT * FROM products";
let values: any[] = [];

if (category) {
query += " WHERE category_id = ?";
const map: any = { chairs: 1, desks: 2, sofas: 3 };
values = [map[category]];
}

const [rows] = await db.query(query, values);
return NextResponse.json(rows);
}