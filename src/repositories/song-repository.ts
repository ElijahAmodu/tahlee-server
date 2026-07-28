import { query } from "../db/query";

export interface SongRow {
  id: string;
  name: string;
  artist: string;
  audio_url: string;
  image_url: string | null;
  duration: number;
  added_by: string;
  created_at: string;
}

class SongRepository {
  async create(data: {
    name: string;
    artist: string;
    audio_url: string;
    image_url: string | null;
    duration: number;
    added_by: string;
  }): Promise<SongRow> {
    const rows = await query<SongRow>(
      `INSERT INTO songs (name, artist, audio_url, image_url, duration, added_by)
            VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING id, name, artist, audio_url, image_url, duration, added_by, created_at`,
      [
        data.name,
        data.artist,
        data.audio_url,
        data.image_url ?? null,
        data.duration,
        data.added_by,
      ],
    );

    const song = rows[0];

    if (!song) {
      throw new Error("Failed to upload song");
    }

    return song;
  }
}

export default new SongRepository();
