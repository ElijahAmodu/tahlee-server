"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_error_1 = require("../db/pg-error");
const song_repository_1 = __importDefault(require("../repositories/song-repository"));
class SnngServices {
    async createPlaylist(data) {
        try {
            const { name, artist, audio_url, image_url, duration, added_by } = data;
            const createdPlaylistData = await song_repository_1.default.create({
                name: name,
                artist: artist,
                audio_url: audio_url,
                image_url: image_url || null,
                duration: duration,
                added_by: added_by,
            });
            return createdPlaylistData;
        }
        catch (error) {
            (0, pg_error_1.handlePgError)(error);
        }
    }
}
exports.default = new SnngServices();
//# sourceMappingURL=song-service.js.map