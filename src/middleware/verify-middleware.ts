import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../errors/AppError";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { pool } from "../db/pool";

interface AccessTokenPayload {
  id: string;
  email: string;
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthorizedError("Unauthorized");
  }

  const token = authHeader?.split(" ")[1];

  if (!token) {
    throw new UnauthorizedError("token required");
  }

  let decodedToken: AccessTokenPayload;

  try {
    decodedToken = jwt.verify(
      token,
      env.JWT_ACCESS_SECRET,
    ) as AccessTokenPayload;
  } catch (err) {
    throw new UnauthorizedError("Invalid or expired Token");
  }

  const result = await pool.query(
    `SELECT id, email, name FROM users WHERE id = $1`,
    [decodedToken.id],
  );

  const user = result.rows[0];

  if (!user) {
    throw new UnauthorizedError("User not found");
  }

  req.user = user;
  next();
};
