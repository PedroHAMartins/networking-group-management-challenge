import sqlite3 from "sqlite3";
import { open } from "sqlite";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

export async function initDb() {
  const db = await open({
    filename: "./database.sqlite",
    driver: sqlite3.Database,
  });

  // Enable foreign key constraints
  await db.exec(`PRAGMA foreign_keys = ON;`);

  // Users table (id as UUID string)
  await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME,
        role TEXT,
        permissions TEXT,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        active INTEGER DEFAULT 1,
        admitted INTEGER DEFAULT 0,
        name TEXT,
        company TEXT,
        purpose TEXT,
        referrals INTEGER DEFAULT 0,
        token TEXT,
        gender TEXT,
        city TEXT,
        state TEXT,
        country TEXT,
        birthdate TEXT
      )
    `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS variables (
      key TEXT PRIMARY KEY,
      value TEXT
    )
  `);

  const adminPassword = process.env.ADMIN_PASSWORD;
  const encryptedPassword = await bcrypt.hash(adminPassword, 10);

  await db.exec(`
      INSERT INTO variables (key, value) VALUES ('admin_password', '${encryptedPassword}')
    `);

  return db;
}

export type Db = Awaited<ReturnType<typeof initDb>>;
