import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";

function connect() {
  return mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "furniture_factory",
  });
}

export async function PUT(req: NextRequest, { params }: any) {
  const { id } = params;
  const { field, value } = await req.json();

  const db = await connect();
  await db.execute(`UPDATE products SET ${field} = ? WHERE id = ?`, [
    value,
    id,
  ]);
  db.end();

  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest, { params }: any) {
  const { id } = params;

  const db = await connect();
  await db.execute("DELETE FROM products WHERE id = ?", [id]);
  db.end();

  return NextResponse.json({ success: true });
}
