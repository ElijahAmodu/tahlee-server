"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../db/query");
class PlaylistsRepository {
    async create(data) {
        const rows = await (0, query_1.query)(`INSERT INTO playlists (name, image_url, owner_id)
        VALUES ($1, $2, $3)
      RETURNING id, name, image_url, owner_id, mode, created_at, updated_at`, [data.name, data.image_url ?? null, data.owner_id]);
        const playlist = rows[0];
        if (!playlist) {
            throw new Error("Failed to create playlist");
        }
        return playlist;
    }
    async findPlaylist(playlistId) {
        const rows = await (0, query_1.query)(`
        SELECT * FROM playlists 
        WHERE id = $1
    `, [playlistId]);
        return rows[0] ?? null;
    }
    async deleteByOwnerId(playlistId) {
        await (0, query_1.query)(`DELETE FROM playlists WHERE id = $1`, [playlistId]);
    }
}
exports.default = new PlaylistsRepository();
//# sourceMappingURL=playlist-repository.js.map