import { SignupInput, LoginInput, refreshTokeninput } from "../validators/auth-schema";
declare class AuthService {
    signup(data: SignupInput): Promise<{
        id: string;
        email: string;
        name: string;
        created_at: Date;
    }>;
    login(data: LoginInput): Promise<{
        user: {
            id: string;
            email: string;
            name: string;
            created_at: Date;
        };
        accessToken: string;
        refreshToken: string;
    }>;
    refreshToken(token: refreshTokeninput): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(refreshToken: string): Promise<void>;
}
declare const _default: AuthService;
export default _default;
//# sourceMappingURL=auth-service.d.ts.map