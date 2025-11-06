import { Db } from "../../db/sqlite";
import { CreateUserDTO, User } from "../../models";
import { createUser } from "./create";
import { updateUser, approveUser } from "./update";
import { findUserByEmail, findUserById, findUserByToken } from "./find";

export class UserRepository {
  constructor(private db: Db) {}

  async create(data: CreateUserDTO): Promise<User> {
    return createUser(this.db, data);
  }

  async update(id: string, data: Partial<User>): Promise<void> {
    return updateUser(this.db, id, data);
  }

  async approveUser(id: string, token: string): Promise<void> {
    return approveUser(this.db, id, token);
  }

  async findByEmail(email: string): Promise<User | null> {
    return findUserByEmail(this.db, email);
  }

  async findById(id: string): Promise<User | null> {
    return findUserById(this.db, id);
  }

  async findByToken(token: string): Promise<User | null> {
    return findUserByToken(this.db, token);
  }
}
