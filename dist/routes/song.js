"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const song_controller_1 = require("../controller/song-controller");
const verify_middleware_1 = __importDefault(require("../middleware/verify-middleware"));
const router = (0, express_1.Router)();
router.post("/create-song", verify_middleware_1.default, song_controller_1.createSong);
exports.default = router;
//# sourceMappingURL=song.js.map