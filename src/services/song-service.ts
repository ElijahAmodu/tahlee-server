import { handlePgError } from "../db/pg-error";
import songRepository, { SongRow } from "../repositories/song-repository";

class SnngServices {
  async createPlaylist(data: {
    name: string;
    artist: string;
    audio_url: string;
    image_url?: string | undefined;
    duration: number;
    added_by: string;
  }): Promise<SongRow> {
    try {
      const { name, artist, audio_url, image_url, duration, added_by } = data;

      const createdPlaylistData = await songRepository.create({
        name: name,
        artist: artist,
        audio_url: audio_url,
        image_url: image_url || null,
        duration: duration,
        added_by: added_by,
      });

      return createdPlaylistData;
    } catch (error) {
      handlePgError(error);
    }
  }
}

export default new SnngServices();
