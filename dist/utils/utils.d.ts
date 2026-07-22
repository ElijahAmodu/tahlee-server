import jwt from "jsonwebtoken";
export declare const generateAccessToken: (data: {
    id: string;
    email: string;
}) => string;
export declare const generateRefreshToken: (data: {
    id: string;
}) => string;
export declare const verifyRefreshToken: (token: string) => string | jwt.JwtPayload;
//# sourceMappingURL=utils.d.ts.map