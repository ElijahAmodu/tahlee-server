import bcrypt from "bcryptjs";
import { SignupInput } from "../validators/auth-schema";
import { handlePgError } from "../db/pg-error";
import userRepository from "../repositories/user-repository";

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

      return user;
    } catch (error) {
      handlePgError(error);
    }
  }
}

export default new AuthService();
