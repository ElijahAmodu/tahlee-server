import bcrypt from "bcryptjs";
import { SignupInput } from "../validators/auth-schema";
import { signupSchema } from "../validators/auth-schema";

class AuthService {
  async signup(data: SignupInput) {
    const { email, password, name } = data;

    // TODO:
    // Check database

    const emailExistInDb = false;

    if (emailExistInDb) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const userData = {
      email,
      password: hashedPassword,
      name,
    };

    // TODO:
    // Save user to database

    const user = {
      id: "temporary-id",
      email: userData.email,
      name: userData.name,
    };

    return user;
  }
}

export default new AuthService();
