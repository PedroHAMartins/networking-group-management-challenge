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

  await db.exec(`PRAGMA foreign_keys = ON;`);

  await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME,
        role TEXT,
        permissions TEXT,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        active BOOLEAN DEFAULT 0,
        admitted BOOLEAN DEFAULT 0,
        name TEXT,
        company TEXT,
        purpose TEXT,
        referrals INTEGER DEFAULT 0,
        token TEXT,
        gender TEXT,
        city TEXT,
        state TEXT,
        country TEXT,
        birthdate TEXT,
        status TEXT
      )
    `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS variables (
      key TEXT PRIMARY KEY,
      value TEXT
    )
  `);

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (adminPassword) {
    const encryptedPassword = await bcrypt.hash(adminPassword, 10);

    await db.exec(`
      INSERT INTO variables (key, value) 
      SELECT 'admin_password', '${encryptedPassword}'
      WHERE NOT EXISTS (SELECT 1 FROM variables WHERE key = 'admin_password')
    `);
  }

  return db;
}

export type Db = Awaited<ReturnType<typeof initDb>>;
