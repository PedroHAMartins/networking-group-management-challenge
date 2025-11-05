import { Db } from "../db/sqlite";
import { CreateUserDTO, User } from "../models/user";

export class UserRepository {
  constructor(private db: Db) {}

  async create(data: CreateUserDTO): Promise<User> {
    const result = await this.db.run(
      `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
      [data.name, data.email, data.password]
    );

    const id = result.lastID as number;
    return { id, ...data, created_at: new Date().toISOString() };
  }

  async findByEmail(email: string): Promise<User | null> {
    const row = await this.db.get(`SELECT * FROM users WHERE email = ?`, [
      email,
    ]);
    return row ?? null;
  }
}
