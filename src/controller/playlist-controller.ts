import { NextFunction, Request, Response } from "express";
import playlistsServices from "../services/playlists-services";
import { playlistSchema } from "../validators/playlist-schema";
import z from "zod";

export const createPlaylist = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validationResult = playlistSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        errors: z.treeifyError(validationResult.error),
      });
    }

    const playlist = await playlistsServices.createPlaylist({
      ...validationResult.data,
      owner_id: req.user!.id,
    });

    return res.status(201).json({
      success: true,
      message: "Playlist created successfully",
      playlist: playlist,
    });
  } catch (error) {
    next(error);
  }
};
