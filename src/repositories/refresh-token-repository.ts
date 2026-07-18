import { query } from "../db/query";

interface RefreshTokenRow {
  id: string;
  user_id: string;
  token_hash: string;
  expiry_at: Date;
}

class RefreshTokenRepository {
  async create(data: {
    userId: string;
    tokenHash: string;
    expiresAt: Date;
  }): Promise<void> {
    await query(
      `INSERT INTO refresh_tokens (user_id, token_hash, expiry_at)
        VALUES ($1, $2, $3)`,
      [data.userId, data.tokenHash, data.expiresAt],
    );
  }

  async findHash(tokenHash: string): Promise<RefreshTokenRow | null> {
    const rows = await query<RefreshTokenRow>(
      "SELECT * FROM refresh_tokens WHERE token_hash = $1",
      [tokenHash],
    );

    return rows[0] ?? null;
  }

  async deleteByHash(tokenHash: string): Promise<void> {
    await query("DELETE FROM refresh_tokens WHERE token_hash = $1", [
      tokenHash,
    ]);
  }
}

export default new RefreshTokenRepository();
