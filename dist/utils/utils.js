"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const generateAccessToken = (data) => {
    const accessToken = jsonwebtoken_1.default.sign(data, env_1.env.JWT_ACCESS_SECRET, {
        expiresIn: "15m",
    });
    return accessToken;
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (data) => {
    const refreshToken = jsonwebtoken_1.default.sign(data, env_1.env.JWT_REFRESH_SECRET, {
        expiresIn: "1d",
    });
    return refreshToken;
};
exports.generateRefreshToken = generateRefreshToken;
const verifyRefreshToken = (token) => {
    const verifiedToken = jsonwebtoken_1.default.verify(token, env_1.env.JWT_REFRESH_SECRET);
    return verifiedToken;
};
exports.verifyRefreshToken = verifyRefreshToken;
//# sourceMappingURL=utils.js.map