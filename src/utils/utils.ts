import jwt from "jsonwebtoken";
import { env } from "../config/env";

export const generateAccessToken = (data: { id: string; email: string }) => {
  const accessToken = jwt.sign(data, env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });

  return accessToken;
};

export const generateRefreshToken = (data: { id: string }) => {
  const refreshToken = jwt.sign(data, env.JWT_REFRESH_SECRET, {
    expiresIn: "1d",
  });

  return refreshToken;
};
