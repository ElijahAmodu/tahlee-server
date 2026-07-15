import type { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { signupSchema } from "../validators/auth-schema";
import AuthService from "../services/auth-service";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validationResult = signupSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        errors: z.treeifyError(validationResult.error),
      });
    }

    const user = await AuthService.signup(validationResult.data);

    return res.status(201).json({
      success: true,
      message: "User signed up successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
