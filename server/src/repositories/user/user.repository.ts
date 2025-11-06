import { Db } from "../../db/sqlite";
import { CreateUserDTO, GetUserDto, User } from "../../models";
import { createUser } from "./create";
import { updateUser } from "./update";
import { findUserByEmail, findUserById, findUserByToken } from "./find";
import { getAllIntentions, getAllUsers } from "./get";

export class UserRepository {
  constructor(private db: Db) {}

  async create(data: CreateUserDTO): Promise<User> {
    return createUser(this.db, data);
  }

  async update(id: string, data: Partial<User>): Promise<void> {
    return updateUser(this.db, id, data);
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

  async getAllUsers(): Promise<GetUserDto[]> {
    return getAllUsers(this.db);
  }

  async getAllIntentions(): Promise<GetUserDto[]> {
    return getAllIntentions(this.db);
  }
}
