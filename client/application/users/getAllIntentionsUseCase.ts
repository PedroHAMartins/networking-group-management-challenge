import { GetAllUsersDto } from "../../domain/user/dtos/get-user.dto";
import {
  UserRemoteRepository,
  makeUserRemoteRepository,
} from "../../infrastructure/repositories/userRemoteRepository";
import { DEFAULT_API_BASE } from "../../infrastructure/config";

export class GetAllIntentionsUseCase {
  constructor(private repo: UserRemoteRepository) {}

  async execute(): Promise<GetAllUsersDto> {
    const users = await this.repo.getAllIntentions();
    return users;
  }
}

export function makeGetAllIntentionsUseCase(
  baseUrl: string = DEFAULT_API_BASE
) {
  const repo = makeUserRemoteRepository(baseUrl);
  return new GetAllIntentionsUseCase(repo as UserRemoteRepository);
}
