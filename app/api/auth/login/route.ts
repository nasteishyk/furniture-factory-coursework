import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "furniture_factory",
};

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const connection = await mysql.createConnection(dbConfig);

  const [rows] = await connection.execute(
    "SELECT id, name, email, role FROM users WHERE email = ? AND password = ?",
    [email, password]
  );

  await connection.end();

  if ((rows as any[]).length === 0) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  return NextResponse.json(rows[0]);
}
