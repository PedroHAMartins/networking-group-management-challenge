import { Db } from "@/src/db/sqlite";

export class VariablesRepository {
  constructor(private db: Db) {}

  async getVariable(key: string): Promise<string | null> {
    const row = await this.db.get(`SELECT value FROM variables WHERE key = ?`, [
      key,
    ]);
    return row ? row.value : null;
  }

  async isVariableValid(key: string): Promise<boolean> {
    const row = await this.db.get(`SELECT * FROM variables WHERE key = ?`, [
      key,
    ]);
    return !!row;
  }
}
