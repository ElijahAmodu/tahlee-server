import bcrypt from "bcryptjs";
import { SignupInput, LoginInput } from "../validators/auth-schema";
import { handlePgError } from "../db/pg-error";
import userRepository from "../repositories/user-repository";
import { UnauthorizedError } from "../errors/AppError";
import { generateAccessToken, generateRefreshToken } from "../utils/utils";
import refreshTokenRepository from "../repositories/refresh-token-repository";
import { hashToken } from "../utils/hash-token";

function toPublicUser(user: {
  id: string;
  email: string;
  name: string;
  created_at: Date;
}) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    created_at: user.created_at,
  };
}

class AuthService {
  async signup(data: SignupInput) {
    const { email, password, name } = data;
    const hashedPassword = await bcrypt.hash(password, 12);

    try {
      const user = await userRepository.create({
        email,
        password: hashedPassword,
        name,
      });

      return toPublicUser(user);
    } catch (error) {
      handlePgError(error);
    }
  }

  async login(data: LoginInput) {
    const { email, password } = data;

    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedError("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedError("Invalid credentials");
    }

    const publicUser = toPublicUser(user);
    const accessToken = generateAccessToken({ id: user.id, email: user.email });
    const refreshToken = generateRefreshToken({ id: user.id });

    await refreshTokenRepository.create({
      userId: user.id,
      tokenHash: hashToken(refreshToken),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    return { user: publicUser, accessToken, refreshToken };
  }

  async logout(refreshToken: string) {
    await refreshTokenRepository.deleteByHash(hashToken(refreshToken));
  }
}

export default new AuthService();
