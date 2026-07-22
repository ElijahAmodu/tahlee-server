"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const pg_error_1 = require("../db/pg-error");
const user_repository_1 = __importDefault(require("../repositories/user-repository"));
const AppError_1 = require("../errors/AppError");
const utils_1 = require("../utils/utils");
const refresh_token_repository_1 = __importDefault(require("../repositories/refresh-token-repository"));
const hash_token_1 = require("../utils/hash-token");
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
        const publicUser = toPublicUser(user);
        const accessToken = (0, utils_1.generateAccessToken)({ id: user.id, email: user.email });
        const refreshToken = (0, utils_1.generateRefreshToken)({ id: user.id });
        await refresh_token_repository_1.default.create({
            userId: user.id,
            tokenHash: (0, hash_token_1.hashToken)(refreshToken),
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        });
        return { user: publicUser, accessToken, refreshToken };
    }
    async refreshToken(token) {
        let verifiedToken;
        try {
            verifiedToken = (0, utils_1.verifyRefreshToken)(token.refreshToken);
        }
        catch {
            throw new AppError_1.UnauthorizedError("Invalid or expired refresh token");
        }
        const { id } = verifiedToken;
        const tokenHash = (0, hash_token_1.hashToken)(token.refreshToken);
        const storedToken = await refresh_token_repository_1.default.findHash(tokenHash);
        if (!storedToken) {
            throw new AppError_1.UnauthorizedError("Refresh token has been revoked");
        }
        if (storedToken.revoked_at) {
            await refresh_token_repository_1.default.revokeAllForUser(storedToken.user_id);
            throw new AppError_1.UnauthorizedError("Session revoked — please log in again");
        }
        const user = await user_repository_1.default.findById(id);
        if (!user) {
            throw new AppError_1.UnauthorizedError("Invalid credentials");
        }
        await refresh_token_repository_1.default.revokeByHash(tokenHash);
        const newRefreshToken = (0, utils_1.generateRefreshToken)({ id: user.id });
        await refresh_token_repository_1.default.create({
            userId: user.id,
            tokenHash: (0, hash_token_1.hashToken)(newRefreshToken),
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        });
        const accessToken = (0, utils_1.generateAccessToken)({
            id: user.id,
            email: user.email,
        });
        return { accessToken: accessToken, refreshToken: newRefreshToken };
    }
    async logout(refreshToken) {
        await refresh_token_repository_1.default.revokeByHash((0, hash_token_1.hashToken)(refreshToken));
    }
}
exports.default = new AuthService();
//# sourceMappingURL=auth-service.js.map