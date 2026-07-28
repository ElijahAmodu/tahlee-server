import { NextFunction, Request, Response } from "express";
import songService from "../services/song-service";
import { songSchema } from "../validators/song-schema";
import z from "zod";

export const createSong = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validationResult = songSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        errors: z.treeifyError(validationResult.error),
      });
    }

    const playlist = await songService.createPlaylist({
      ...validationResult.data,
      added_by: req.user!.id,
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
