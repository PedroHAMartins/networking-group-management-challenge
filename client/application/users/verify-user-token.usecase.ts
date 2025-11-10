import { User } from "../../domain/user/entities/user.entity";
import {
  UserRemoteRepository,
  makeUserRemoteRepository,
} from "../../infrastructure/repositories/user.repository";
import { DEFAULT_API_BASE } from "../../infrastructure/config";

export class VerifyUserTokenUseCase {
  constructor(private repo: UserRemoteRepository) {}

  async execute(token: string): Promise<User | false> {
    if (!token) throw new Error("Token is required");
    const user = await this.repo.findByToken(token);
    if (!user) {
      return false;
    }
    return user;
  }
}

export function makeVerifyUserTokenUseCase(baseUrl: string = DEFAULT_API_BASE) {
  const repo = makeUserRemoteRepository(baseUrl);
  return new VerifyUserTokenUseCase(repo as UserRemoteRepository);
}
