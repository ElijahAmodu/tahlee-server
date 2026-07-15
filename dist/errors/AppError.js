"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConflictError = exports.AppError = void 0;
class AppError extends Error {
    isOperational = true;
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
class ConflictError extends AppError {
    statusCode = 409;
}
exports.ConflictError = ConflictError;
//# sourceMappingURL=AppError.js.map