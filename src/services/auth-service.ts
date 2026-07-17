import bcrypt from "bcryptjs";
import { SignupInput, LoginInput } from "../validators/auth-schema";
import { handlePgError } from "../db/pg-error";
import userRepository from "../repositories/user-repository";
import { UnauthorizedError } from "../errors/AppError";

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

    const sentUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      created_at: user.created_at,
    };

    return sentUser;
  }
}

export default new AuthService();
