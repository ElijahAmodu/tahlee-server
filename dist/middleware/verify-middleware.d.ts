import { Request, Response, NextFunction } from "express";
declare const authMiddleware: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export default authMiddleware;
//# sourceMappingURL=verify-middleware.d.ts.map