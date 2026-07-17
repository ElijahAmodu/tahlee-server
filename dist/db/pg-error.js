"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePgError = handlePgError;
const pg_1 = require("pg");
const AppError_1 = require("../errors/AppError");
function handlePgError(error) {
    if (error instanceof pg_1.DatabaseError) {
        switch (error.code) {
            case "23505":
                throw new AppError_1.ConflictError("Email already exists");
            case "23503":
                throw new AppError_1.ConflictError("Related resource does not exist");
        }
    }
    throw error;
}
//# sourceMappingURL=pg-error.js.map