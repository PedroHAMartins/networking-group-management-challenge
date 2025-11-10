import { CreateUserDTO } from "../../domain/user/dtos/create-user.dto";
import {
  UserRemoteRepository,
  makeUserRemoteRepository,
} from "../../infrastructure/repositories/user.repository";

export class CreateUserUseCase {
  constructor(private repo: UserRemoteRepository) {}

  async execute(dto: CreateUserDTO) {
    if (!dto.email || !dto.password) {
      throw new Error("email and password are required");
    }

    if (!dto.role) dto.role = "member";

    const created = await this.repo.createUser(dto);
    return created;
  }
}

import { DEFAULT_API_BASE } from "../../infrastructure/config";

export function makeCreateUserUseCase(baseUrl: string = DEFAULT_API_BASE) {
  const repo = makeUserRemoteRepository(baseUrl);
  return new CreateUserUseCase(repo as UserRemoteRepository);
}
