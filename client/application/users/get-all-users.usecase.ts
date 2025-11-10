import { GetAllUsersDto } from "../../domain/user/dtos/get-user.dto";
import {
  UserRemoteRepository,
  makeUserRemoteRepository,
} from "../../infrastructure/repositories/user.repository";
import { DEFAULT_API_BASE } from "../../infrastructure/config";

export class GetAllUsersUseCase {
  constructor(private repo: UserRemoteRepository) {}

  async execute(): Promise<GetAllUsersDto> {
    const users = await this.repo.getAllUsers();
    return users;
  }
}

export function makeGetAllUsersUseCase(baseUrl: string = DEFAULT_API_BASE) {
  const repo = makeUserRemoteRepository(baseUrl);
  return new GetAllUsersUseCase(repo as UserRemoteRepository);
}
