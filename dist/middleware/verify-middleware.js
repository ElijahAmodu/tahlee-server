"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const AppError_1 = require("../errors/AppError");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const pool_1 = require("../db/pool");
const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        throw new AppError_1.UnauthorizedError("Unauthorized");
    }
    const token = authHeader?.split(" ")[1];
    if (!token) {
        throw new AppError_1.UnauthorizedError("token required");
    }
    let decodedToken;
    try {
        decodedToken = jsonwebtoken_1.default.verify(token, env_1.env.JWT_ACCESS_SECRET);
    }
    catch (err) {
        throw new AppError_1.UnauthorizedError("Invalid or expired Token");
    }
    const result = await pool_1.pool.query(`SELECT id, email, name FROM users WHERE id = $1`, [decodedToken.id]);
    const user = result.rows[0];
    if (!user) {
        throw new AppError_1.UnauthorizedError("User not found");
    }
    req.user = user;
    next();
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=verify-middleware.js.map