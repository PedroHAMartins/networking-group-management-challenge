import { handleTokenGeneration } from "../helpers";
import { ApproveUserDTO, CreateUserDTO, GetUserDto, User } from "../models";
import { UserRepository } from "../repositories";

export class UserService {
  constructor(private repo: UserRepository) {}

  async updateUser(
    id: string,
    token: string,
    data: Partial<User>
  ): Promise<User> {
    const existing = await this.repo.findById(id);
    if (!existing) {
      throw new Error("User not found");
    }

    if (token !== existing.token) {
      throw new Error("Invalid token");
    }

    await this.repo.update(id, data);
    const updated = await this.repo.findById(id);
    if (!updated) {
      throw new Error("Failed to retrieve updated user");
    }
    return updated;
  }

  async createUser(data: CreateUserDTO): Promise<User> {
    if (!data.email || !data.password) {
      throw new Error("Invalid input: 'email' and 'password' are required");
    }

    const existing = await this.repo.findByEmail(data.email);
    if (existing) {
      throw new Error("Email already in use");
    }

    if (data.active === undefined) data.active = true;
    if (data.admitted === undefined) data.admitted = false;
    if (!data.referrals) data.referrals = 0;

    const created = await this.repo.create(data);
    return created;
  }

  async approveUser(data: ApproveUserDTO): Promise<User> {
    if (!data.id) {
      throw new Error("Invalid input: User 'id' is required");
    }

    const user = await this.repo.findById(data.id);

    if (!user) {
      throw new Error("User not found");
    }

    if (user.admitted) {
      throw new Error("User is already admitted");
    }

    const token = handleTokenGeneration();

    await this.repo.update(data.id, { admitted: data.approved, token });
    const updated = await this.repo.findById(data.id);
    if (!updated) {
      throw new Error("Failed to retrieve updated user");
    }
    return updated;
  }

  async getAllUsers(): Promise<GetUserDto[]> {
    return this.repo.getAllUsers();
  }

  async getAllIntentions(): Promise<GetUserDto[]> {
    return this.repo.getAllIntentions();
  }
}
