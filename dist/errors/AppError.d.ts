export declare abstract class AppError extends Error {
    abstract readonly statusCode: number;
    readonly isOperational: boolean;
    constructor(message: string);
}
export declare class ConflictError extends AppError {
    readonly statusCode = 409;
}
//# sourceMappingURL=AppError.d.ts.map