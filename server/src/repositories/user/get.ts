import { Db } from "@/src/db/sqlite";
import { GetUserDto } from "@/src/models";

export async function getAllUsers(db: Db): Promise<GetUserDto[]> {
  const rows = await db.all(
    `SELECT id, created_at, updated_at, role, permissions, email, active, admitted, name, company, purpose, referrals, token, gender, city, state, country, birthdate, status FROM users`
  );
  return rows.map((row) => ({
    id: row.id,
    created_at: row.created_at,
    updated_at: row.updated_at,
    role: row.role,
    permissions: row.permissions,
    email: row.email,
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
    status: row.status,
  }));
}

export async function getAllIntentions(db: Db): Promise<GetUserDto[]> {
  const rows = await db.all(
    `SELECT id, created_at, updated_at, role, permissions, email, active, admitted, name, company, purpose, referrals, token, gender, city, state, country, birthdate, status FROM users WHERE status = 'PENDING'`
  );
  return rows.map((row) => ({
    id: row.id,
    created_at: row.created_at,
    updated_at: row.updated_at,
    role: row.role,
    permissions: row.permissions,
    email: row.email,
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
    status: row.status,
  }));
}

export async function getTotalUsersDatas(
  db: Db
): Promise<{ approved: number; total: number }> {
  const approved = await db.get(
    `SELECT COUNT(*) as total FROM users WHERE status = 'APPROVED'`
  );
  const total = await db.get(`SELECT COUNT(*) as total FROM users`);
  const row = {
    approved: approved.total,
    total: total.total,
  };
  return row;
}
