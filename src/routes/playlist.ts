import { Router } from "express";
import { createPlaylist } from "../controller/playlist-controller";
import authMiddleware from "../middleware/verify-middleware";

const router = Router();

router.post("/create-playlist", authMiddleware, createPlaylist);

export default router;
