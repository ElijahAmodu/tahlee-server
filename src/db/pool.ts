import { Pool } from "pg";
import { env } from "../config/env";

export const pool = new Pool({
  host: env.DB_HOST,
  port: Number(env.DB_PORT ?? 5432),
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  max: 10,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 5_000,
});

pool.on("error", (err) => {
  console.error("Unexpected PG pool error", err);
});

export async function closePool() {
  await pool.end();
}
