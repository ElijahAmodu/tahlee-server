"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSong = void 0;
const song_service_1 = __importDefault(require("../services/song-service"));
const song_schema_1 = require("../validators/song-schema");
const zod_1 = __importDefault(require("zod"));
const createSong = async (req, res, next) => {
    try {
        const validationResult = song_schema_1.songSchema.safeParse(req.body);
        if (!validationResult.success) {
            return res.status(400).json({
                errors: zod_1.default.treeifyError(validationResult.error),
            });
        }
        const playlist = await song_service_1.default.createPlaylist({
            ...validationResult.data,
            added_by: req.user.id,
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
exports.createSong = createSong;
//# sourceMappingURL=song-controller.js.map