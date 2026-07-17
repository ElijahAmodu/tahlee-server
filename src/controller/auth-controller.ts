import type { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { loginSchema, signupSchema } from "../validators/auth-schema";
import AuthService from "../services/auth-service";
import { generateAccessToken, generateRefreshToken } from "../utils/utils";

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
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        created_at: user.created_at,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validationResult = loginSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        errors: z.treeifyError(validationResult.error),
      });
    }

    const user = await AuthService.login(validationResult.data);
    const accessToken = generateAccessToken({
      id: user.id,
      email: user.email,
    });
    const refreshToken = generateRefreshToken({
      id: user.id,
    });

    return res.status(200).json({
      accessToken: accessToken,
      refreshToken: refreshToken,
      user: user,
    });
  } catch (error) {
    next(error);
  }
};
