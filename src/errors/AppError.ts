export abstract class AppError extends Error {
  abstract readonly statusCode: number;
  readonly isOperational: boolean = true;

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;

    Object.setPrototypeOf(this, new.target.prototype);

    Error.captureStackTrace(this, this.constructor);
  }
}

export class ConflictError extends AppError {
  readonly statusCode = 409;
}
