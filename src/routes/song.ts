import { Router } from "express";
import { createSong } from "../controller/song-controller";
import authMiddleware from "../middleware/verify-middleware";

const router = Router();

router.post("/create-song", authMiddleware, createSong);

export default router;
