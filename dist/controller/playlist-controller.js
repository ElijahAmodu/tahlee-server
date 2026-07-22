"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPlaylist = void 0;
const playlists_services_1 = __importDefault(require("../services/playlists-services"));
const playlist_schema_1 = require("../validators/playlist-schema");
const zod_1 = __importDefault(require("zod"));
const createPlaylist = async (req, res, next) => {
    try {
        const validationResult = playlist_schema_1.playlistSchema.safeParse(req.body);
        if (!validationResult.success) {
            return res.status(400).json({
                errors: zod_1.default.treeifyError(validationResult.error),
            });
        }
        const playlist = await playlists_services_1.default.createPlaylist({
            ...validationResult.data,
            owner_id: req.user.id,
        });
        return res.status(201).json({
            success: true,
            message: "Playlist created successfully",
            playlist: playlist,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createPlaylist = createPlaylist;
//# sourceMappingURL=playlist-controller.js.map