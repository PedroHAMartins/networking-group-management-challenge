import { Db } from "../../db/sqlite";
import { User } from "../../models";

export async function updateUser(
  db: Db,
  id: string,
  data: Partial<User>
): Promise<void> {
  const fields: string[] = [];
  const values: any[] = [];
  const now = new Date().toISOString();

  Object.entries(data).forEach(([key, value]) => {
    fields.push(`${key} = ?`);
    if (key === "permissions" && value !== undefined) {
      values.push(JSON.stringify(value));
    } else if (
      (key === "active" || key === "admitted") &&
      value !== undefined
    ) {
      values.push(value ? 1 : 0);
    } else {
      values.push(value);
    }
  });

  await db.run(
    `UPDATE users SET updated_at = ?, ${fields.join(", ")} WHERE id = ?`,
    [...values, now, id]
  );
}
