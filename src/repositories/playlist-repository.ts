import { query } from "../db/query";

export interface PlaylistRow {
  id: string;
  name: string;
  image_url: string | undefined;
  owner_id: string;
  mode: string;
  created_at: string;
  updated_at: string;
}

class PlaylistsRepository {
  async create(data: {
    name: string;
    image_url: string | undefined;
    owner_id: string;
  }): Promise<PlaylistRow> {
    const rows = await query<PlaylistRow>(
      `INSERT INTO playlists (name, image_url, owner_id)
        VALUES ($1, $2, $3)
      RETURNING id, name, image_url, owner_id, mode, created_at, updated_at`,
      [data.name, data.image_url ?? null, data.owner_id],
    );

    const playlist = rows[0];

    if (!playlist) {
      throw new Error("Failed to create playlist");
    }

    return playlist;
  }

  async findPlaylist(playlistId: string): Promise<PlaylistRow | null> {
    const rows = await query<PlaylistRow>(
      `
        SELECT * FROM playlists 
        WHERE id = $1
    `,
      [playlistId],
    );

    return rows[0] ?? null;
  }

  async deleteByOwnerId(playlistId: string): Promise<void> {
    await query(`DELETE FROM playlists WHERE id = $1`, [playlistId]);
  }
}

export default new PlaylistsRepository();
