import { User } from "../../domain/user/entities/user.entity";
import {
  UserRemoteRepository,
  makeUserRemoteRepository,
} from "../../infrastructure/repositories/user.repository";
import { DEFAULT_API_BASE } from "../../infrastructure/config";

export class ApproveUserUseCase {
  constructor(private repo: UserRemoteRepository) {}

  async execute(id: string, approved: boolean): Promise<User> {
    if (!id) throw new Error("User ID is required");
    if (approved === undefined) throw new Error("Approval status is required");
    return this.repo.approveUser(id, approved);
  }
}

export function makeApproveUserUseCase(baseUrl: string = DEFAULT_API_BASE) {
  const repo = makeUserRemoteRepository(baseUrl);
  return new ApproveUserUseCase(repo as UserRemoteRepository);
}
