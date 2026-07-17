import { pool } from "./pool";
import type { QueryResultRow } from "pg";

export async function query<T extends QueryResultRow>(
  text: string,
  params?: unknown[],
): Promise<T[]> {
  const result = await pool.query<T>(text, params);
  return result.rows;
}
