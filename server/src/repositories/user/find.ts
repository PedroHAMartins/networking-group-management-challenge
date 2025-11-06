import { Db } from "../../db/sqlite";
import { User } from "../../models";

function mapUserFromRow(row: any): User {
  return {
    id: row.id,
    created_at: row.created_at,
    updated_at: row.updated_at,
    role: row.role,
    permissions: row.permissions ? JSON.parse(row.permissions) : undefined,
    email: row.email,
    password: row.password,
    active: !!row.active,
    admitted: !!row.admitted,
    name: row.name,
    company: row.company,
    purpose: row.purpose,
    referrals: row.referrals,
    token: row.token,
    gender: row.gender,
    city: row.city,
    state: row.state,
    country: row.country,
    birthdate: row.birthdate,
  } as User;
}

export async function findUserByEmail(
  db: Db,
  email: string
): Promise<User | null> {
  const row = await db.get(`SELECT * FROM users WHERE email = ?`, [email]);
  if (!row) return null;
  return mapUserFromRow(row);
}

export async function findUserById(db: Db, id: string): Promise<User | null> {
  const row = await db.get(`SELECT * FROM users WHERE id = ?`, [id]);
  if (!row) return null;
  return mapUserFromRow(row);
}

export async function findUserByToken(
  db: Db,
  token: string
): Promise<User | null> {
  const row = await db.get(`SELECT * FROM users WHERE token = ?`, [token]);
  if (!row) return null;
  return mapUserFromRow(row);
}
