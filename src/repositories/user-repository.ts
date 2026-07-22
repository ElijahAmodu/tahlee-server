import { query } from "../db/query";

export interface UserRow {
  id: string;
  email: string;
  password: string;
  name: string;
  created_at: Date;
}

export interface RefreshRow {
  id: string;
  email: string;
  name: string;
  created_at: Date;
}

class UserRepository {
  async create(data: {
    email: string;
    password: string;
    name: string;
  }): Promise<UserRow> {
    const rows = await query<UserRow>(
      `INSERT INTO users (email, password, name) 
       VALUES ($1, $2, $3) 
       RETURNING id, email, name, password, created_at`,
      [data.email, data.password, data.name],
    );

    const user = rows[0];

    if (!user) {
      throw new Error("Failed to create user");
    }

    return user;
  }

  async findByEmail(email: string): Promise<UserRow | null> {
    const rows = await query<UserRow>(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);

    return rows[0] ?? null;
  }

  async findById(id: string): Promise<RefreshRow | null> {
    const rows = await query<RefreshRow>(
      `SELECT id, email, name, created_at FROM users WHERE id = $1`,
      [id],
    );

    return rows[0] ?? null;
  }
}

export default new UserRepository();
