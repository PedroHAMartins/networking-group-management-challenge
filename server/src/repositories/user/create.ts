import { Db } from "../../db/sqlite";
import { v4 as uuidv4 } from "uuid";
import { CreateUserDTO, User } from "../../models";

export async function createUser(db: Db, data: CreateUserDTO): Promise<User> {
  const id = uuidv4();
  const now = new Date().toISOString();

  const permissions = data.permissions
    ? JSON.stringify(data.permissions)
    : null;
  const status = "PENDING";
  const active = false;
  const admitted = false;

  await db.run(
    `INSERT INTO users (id, created_at, updated_at, role, permissions, email, password, active, admitted, name, company, purpose, referrals, token, gender, city, state, country, birthdate, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      now,
      now,
      data.role ?? null,
      permissions,
      data.email,
      data.password,
      active,
      admitted,
      data.name ?? null,
      data.company ?? null,
      data.purpose ?? null,
      data.referrals ?? 0,
      data.token ?? null,
      data.gender ?? null,
      data.city ?? null,
      data.state ?? null,
      data.country ?? null,
      data.birthdate ?? null,
      status,
    ]
  );

  const created: User = {
    id,
    created_at: now,
    updated_at: now,
    role: data.role,
    permissions: data.permissions,
    email: data.email,
    password: data.password,
    active: !!data.active,
    admitted: !!data.admitted,
    name: data.name,
    company: data.company,
    purpose: data.purpose,
    referrals: data.referrals ?? 0,
    token: data.token,
    gender: data.gender,
    city: data.city,
    state: data.state,
    country: data.country,
    birthdate: data.birthdate,
    status,
  };

  return created;
}
