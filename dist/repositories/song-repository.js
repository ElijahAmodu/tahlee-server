"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../db/query");
class SongRepository {
    async create(data) {
        const rows = await (0, query_1.query)(`INSERT INTO songs (name, artist, audio_url, image_url, duration, added_by)
            VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING id, name, artist, audio_url, image_url, duration, added_by, created_at`, [
            data.name,
            data.artist,
            data.audio_url,
            data.image_url ?? null,
            data.duration,
            data.added_by,
        ]);
        const song = rows[0];
        if (!song) {
            throw new Error("Failed to upload song");
        }
        return song;
    }
}
exports.default = new SongRepository();
//# sourceMappingURL=song-repository.js.map