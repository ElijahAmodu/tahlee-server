"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_error_1 = require("../db/pg-error");
const playlist_repository_1 = __importDefault(require("../repositories/playlist-repository"));
class PlaylistServices {
    async createPlaylist(data) {
        try {
            const { name, image_url, owner_id } = data;
            const createdPlaylistData = await playlist_repository_1.default.create({
                name: name,
                image_url: image_url,
                owner_id: owner_id,
            });
            return createdPlaylistData;
        }
        catch (error) {
            (0, pg_error_1.handlePgError)(error);
        }
    }
}
exports.default = new PlaylistServices();
//# sourceMappingURL=playlists-services.js.map