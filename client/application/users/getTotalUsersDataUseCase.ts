import { TotalUsersDataDto } from "../../domain/user/dtos/data.dto";
import {
  UserRemoteRepository,
  makeUserRemoteRepository,
} from "../../infrastructure/repositories/userRemoteRepository";
import { DEFAULT_API_BASE } from "../../infrastructure/config";

export class GetTotalUsersDataUseCase {
  constructor(private repo: UserRemoteRepository) {}

  async execute(): Promise<TotalUsersDataDto> {
    const users = await this.repo.getTotalUsersData();
    return users;
  }
}

export function makeGetTotalUsersDataUseCase(
  baseUrl: string = DEFAULT_API_BASE
) {
  const repo = makeUserRemoteRepository(baseUrl);
  return new GetTotalUsersDataUseCase(repo as UserRemoteRepository);
}
