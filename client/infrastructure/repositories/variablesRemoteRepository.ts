import { HttpClient } from "infrastructure";

export class VariablesRemoteRepository {
  constructor(private client: HttpClient) {}

  async isVariableValid(key: string, value: string): Promise<boolean> {
    // baseUrl already includes /api, so path must not repeat it
    const res = await this.client.post<{ isValid: boolean }>(
      `/variables/valid/${key}`,
      { value }
    );
    if (!res.ok) {
      throw new Error(res.error?.message || `Request failed (${res.status})`);
    }
    return !!res.data?.isValid;
  }
}

export function makeVariablesRemoteRepository(baseUrl: string) {
  return new VariablesRemoteRepository(new HttpClient(baseUrl));
}
