import { HttpClient } from "../http/httpClient";
import { CreateUserDTO } from "../../domain/user/dtos/create-user.dto";
import { GetAllUsersDto } from "../../domain/user/dtos/get-user.dto";
import { User } from "../../domain/user/entities/user.entity";

export class UserRemoteRepository {
  constructor(private client: HttpClient) {}

  async createUser(dto: CreateUserDTO): Promise<User> {
    const res = await this.client.post<User>("/users", dto);
    if (!res.ok) {
      throw new Error(res.error?.message || `Request failed (${res.status})`);
    }
    return res.data as User;
  }

  async getAllUsers(): Promise<GetAllUsersDto> {
    const res = await this.client.get<GetAllUsersDto>("/users");
    if (!res.ok) {
      throw new Error(res.error?.message || `Request failed (${res.status})`);
    }
    return res.data as GetAllUsersDto;
  }

  async getAllIntentions(): Promise<GetAllUsersDto> {
    const res = await this.client.get<GetAllUsersDto>("/users/intentions");
    if (!res.ok) {
      throw new Error(res.error?.message || `Request failed (${res.status})`);
    }
    return res.data as GetAllUsersDto;
  }
}

export function makeUserRemoteRepository(baseUrl: string) {
  return new UserRemoteRepository(new HttpClient(baseUrl));
}
