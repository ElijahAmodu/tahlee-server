import { handlePgError } from "../db/pg-error";
import playlistRepository, {
  PlaylistRow,
} from "../repositories/playlist-repository";

class PlaylistServices {
  async createPlaylist(data: {
    name: string;
    image_url?: string | undefined;
    owner_id: string;
  }): Promise<PlaylistRow> {
    try {
      const { name, image_url, owner_id } = data;

      const createdPlaylistData = await playlistRepository.create({
        name: name,
        image_url: image_url,
        owner_id: owner_id,
      });

      return createdPlaylistData;
    } catch (error) {
      handlePgError(error);
    }
  }
}

export default new PlaylistServices();
