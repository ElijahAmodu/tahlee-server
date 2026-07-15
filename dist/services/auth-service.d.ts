import { SignupInput } from "../validators/auth-schema";
declare class AuthService {
    signup(data: SignupInput): Promise<{
        id: string;
        email: string;
        name: string;
    }>;
}
declare const _default: AuthService;
export default _default;
//# sourceMappingURL=auth-service.d.ts.map