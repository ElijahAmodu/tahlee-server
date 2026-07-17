"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const pg_error_1 = require("../db/pg-error");
const user_repository_1 = __importDefault(require("../repositories/user-repository"));
const AppError_1 = require("../errors/AppError");
function toPublicUser(user) {
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        created_at: user.created_at,
    };
}
class AuthService {
    async signup(data) {
        const { email, password, name } = data;
        const hashedPassword = await bcryptjs_1.default.hash(password, 12);
        try {
            const user = await user_repository_1.default.create({
                email,
                password: hashedPassword,
                name,
            });
            return toPublicUser(user);
        }
        catch (error) {
            (0, pg_error_1.handlePgError)(error);
        }
    }
    async login(data) {
        const { email, password } = data;
        const user = await user_repository_1.default.findByEmail(email);
        if (!user) {
            throw new AppError_1.UnauthorizedError("Invalid credentials");
        }
        const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            throw new AppError_1.UnauthorizedError("Invalid credentials");
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
exports.default = new AuthService();
//# sourceMappingURL=auth-service.js.map