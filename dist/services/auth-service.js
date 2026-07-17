"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const pg_error_1 = require("../db/pg-error");
const user_repository_1 = __importDefault(require("../repositories/user-repository"));
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
            return user;
        }
        catch (error) {
            (0, pg_error_1.handlePgError)(error);
        }
    }
}
exports.default = new AuthService();
//# sourceMappingURL=auth-service.js.map