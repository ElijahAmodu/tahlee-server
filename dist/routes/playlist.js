"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const playlist_controller_1 = require("../controller/playlist-controller");
const verify_middleware_1 = __importDefault(require("../middleware/verify-middleware"));
const router = (0, express_1.Router)();
router.post("/create-playlist", verify_middleware_1.default, playlist_controller_1.createPlaylist);
exports.default = router;
//# sourceMappingURL=playlist.js.map