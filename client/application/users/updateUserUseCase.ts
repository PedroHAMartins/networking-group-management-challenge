import { User } from "../../domain/user/entities/user.entity";
import { UpdateUserDTO } from "../../domain/user/dtos/update-user.dto";
import {
  UserRemoteRepository,
  makeUserRemoteRepository,
} from "../../infrastructure/repositories/userRemoteRepository";
import { DEFAULT_API_BASE } from "../../infrastructure/config";

export class UpdateUserUseCase {
  constructor(private repo: UserRemoteRepository) {}

  async execute(id: string, token: string, dto: UpdateUserDTO): Promise<User> {
    if (!id) throw new Error("User ID is required");
    if (!token) throw new Error("Token is required");
    return this.repo.updateUser(id, token, dto);
  }
}

export function makeUpdateUserUseCase(baseUrl: string = DEFAULT_API_BASE) {
  const repo = makeUserRemoteRepository(baseUrl);
  return new UpdateUserUseCase(repo as UserRemoteRepository);
}
