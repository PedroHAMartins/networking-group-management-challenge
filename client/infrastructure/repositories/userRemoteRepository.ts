import { HttpClient } from "../http/httpClient";
import { CreateUserDTO } from "../../domain/user/dtos/create-user.dto";
import { User } from "../../domain/user/entities/user.entity";

export class UserRemoteRepository {
  constructor(private client: HttpClient) {}

  async createUser(dto: CreateUserDTO): Promise<User> {
    const res = await this.client.post<User>("/api/users", dto);
    if (!res.ok) {
      throw new Error(res.error?.message || `Request failed (${res.status})`);
    }
    return res.data as User;
  }
}

export function makeUserRemoteRepository(baseUrl: string) {
  return new UserRemoteRepository(new HttpClient(baseUrl));
}
