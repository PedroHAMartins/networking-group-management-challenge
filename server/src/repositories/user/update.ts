import { Db } from "../../db/sqlite";
import { User } from "../../models";

export async function updateUser(
  db: Db,
  id: string,
  data: Partial<User>
): Promise<void> {
  const sets: string[] = ["updated_at = $updated_at"];
  const params: Record<string, unknown> = {
    $updated_at: new Date().toISOString(),
    $id: id,
  };

  for (const [key, raw] of Object.entries(data)) {
    const paramKey = `$${key}`;
    sets.push(`${key} = ${paramKey}`);
    let value: unknown = raw;
    if (key === "permissions" && raw !== undefined) {
      value = JSON.stringify(raw);
    } else if ((key === "active" || key === "admitted") && raw !== undefined) {
      value = raw ? 1 : 0;
    }
    params[paramKey] = value as unknown;
  }

  const sql = `UPDATE users SET ${sets.join(", ")} WHERE id = $id`;
  await db.run(sql, params);
}

export async function updateUserOnApprove(
  db: Db,
  id: string,
  data: Partial<User>
): Promise<void> {
  const now = new Date().toISOString();
  const sql = `
    UPDATE users
    SET updated_at = ?,
        admitted = ?,
        token = ?,
        status = ?
    WHERE id = ?
  `;

  await db.run(sql, [
    now,
    data.admitted ? 1 : 0,
    data.token || null,
    data.status || null,
    id,
  ]);
}
