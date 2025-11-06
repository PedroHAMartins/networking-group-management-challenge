import { VariablesRepository } from "../repositories";

export class VariablesService {
  constructor(private repo: VariablesRepository) {}

  async getVariableValue(key: string): Promise<string | null> {
    return this.repo.getVariable(key);
  }
}
