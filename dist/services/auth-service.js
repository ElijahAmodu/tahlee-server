"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class AuthService {
    async signup(data) {
        const { email, password, name } = data;
        // TODO:
        // Check database
        const emailExistInDb = false;
        if (emailExistInDb) {
            throw new Error("Email already exists");
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 12);
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
exports.default = new AuthService();
//# sourceMappingURL=auth-service.js.map