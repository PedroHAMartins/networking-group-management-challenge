import { CreateUserDTO, User } from "../models/user";
import { UserRepository } from "../repositories/userRepository";

export class UserService {
  constructor(private repo: UserRepository) {}

  async createUser(data: CreateUserDTO): Promise<User> {
    if (!data.name || !data.email || !data.password) {
      throw new Error("Invalid input: name, email and password are required");
    }

    const existing = await this.repo.findByEmail(data.email);
    if (existing) {
      throw new Error("Email already in use");
    }

    const created = await this.repo.create(data);
    return created;
  }
}
