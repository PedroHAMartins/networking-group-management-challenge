import { VariablesRepository } from "../repositories";
import bcrypt from "bcrypt";

export class VariablesService {
  constructor(private repo: VariablesRepository) {}

  async getVariableValue(key: string): Promise<string | null> {
    return this.repo.getVariable(key);
  }

  async isVariableValid(key: string, value: string): Promise<boolean> {
    // Get stored hashed value
    const stored = await this.repo.getVariable(key);
    if (!stored) return false;
    try {
      // Compare plaintext with hash
      const match = await bcrypt.compare(value, stored);
      return match;
    } catch {
      return false;
    }
  }
}
