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

    const song = await songService.createSong({
      ...validationResult.data,
      added_by: req.user!.id,
    });

    return res.status(201).json({
      success: true,
      message: "Song Uploaded successfully",
      song: song,
    });
  } catch (error) {
    next(error);
  }
};
