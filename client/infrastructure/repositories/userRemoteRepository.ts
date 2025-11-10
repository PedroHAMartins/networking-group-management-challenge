import { HttpClient } from "../http/httpClient";
import { CreateUserDTO } from "../../domain/user/dtos/create-user.dto";
import { UpdateUserDTO } from "../../domain/user/dtos/update-user.dto";
import { GetAllUsersDto } from "../../domain/user/dtos/get-user.dto";
import { TotalUsersDataDto } from "../../domain/user/dtos/data.dto";
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

  async getTotalUsersData(): Promise<TotalUsersDataDto> {
    const res = await this.client.get<TotalUsersDataDto>("/users/data");
    if (!res.ok) {
      throw new Error(res.error?.message || `Request failed (${res.status})`);
    }
    return res.data as TotalUsersDataDto;
  }

  async approveUser(id: string, approved: boolean): Promise<User> {
    const res = await this.client.put<User>(`/users/approve/${id}`, {
      id,
      approved,
    });
    if (!res.ok) {
      throw new Error(res.error?.message || `Request failed (${res.status})`);
    }
    return res.data as User;
  }

  async findByToken(token: string): Promise<User | null> {
    const res = await this.client.post<User | null>(`/users/token`, {
      token,
    });
    if (!res.ok) {
      throw new Error(res.error?.message || `Request failed (${res.status})`);
    }
    return res.data as User | null;
  }

  async updateUser(
    id: string,
    token: string,
    dto: UpdateUserDTO
  ): Promise<User> {
    const res = await this.client.put<User>(`/users/${id}`, {
      ...dto,
      token,
    });
    if (!res.ok) {
      throw new Error(res.error?.message || `Request failed (${res.status})`);
    }
    return res.data as User;
  }
}

export function makeUserRemoteRepository(baseUrl: string) {
  return new UserRemoteRepository(new HttpClient(baseUrl));
}
