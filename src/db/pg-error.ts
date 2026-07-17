import { DatabaseError } from "pg";
import { ConflictError } from "../errors/AppError";

export function handlePgError(error: unknown): never {
  if (error instanceof DatabaseError) {
    switch (error.code) {
      case "23505":
        throw new ConflictError("Email already exists");
      case "23503":
        throw new ConflictError("Related resource does not exist");
    }
  }
  throw error;
}
