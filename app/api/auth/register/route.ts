import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "furniture_factory",
};

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();
  const connection = await mysql.createConnection(dbConfig);

  try {
    // Перевірка на існування email
    const [existing] = await connection.execute(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if ((existing as any[]).length > 0) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }

    // Додавання користувача
    await connection.execute(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password]
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  } finally {
    await connection.end();
  }
}
