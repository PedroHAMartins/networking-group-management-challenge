import {
  makeVariablesRemoteRepository,
  VariablesRemoteRepository,
} from "infrastructure/repositories/variables.repository";

export class IsVariableValidUseCase {
  constructor(private repo: VariablesRemoteRepository) {}

  async execute(key: string, value: string): Promise<boolean> {
    return this.repo.isVariableValid(key, value);
  }
}

import { DEFAULT_API_BASE } from "infrastructure/config";

export function makeIsVariableValidUseCase(baseUrl: string = DEFAULT_API_BASE) {
  const repo = makeVariablesRemoteRepository(baseUrl);
  return new IsVariableValidUseCase(repo as VariablesRemoteRepository);
}
