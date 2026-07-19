import type { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { loginSchema, signupSchema } from "../validators/auth-schema";
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

    const { user, accessToken, refreshToken } = await AuthService.login(
      validationResult.data,
    );

    return res.status(200).json({
      accessToken: accessToken,
      refreshToken: refreshToken,
      user: user,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken || typeof refreshToken !== "string") {
      return res.status(400).json({
        message: "refreshToken is required",
      });
    }

    await AuthService.logout(refreshToken);

    return res.status(200).json({ success: true, message: "logged out" });
  } catch (err) {
    next(err);
  }
};
