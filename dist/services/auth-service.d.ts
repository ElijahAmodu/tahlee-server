import { SignupInput } from "../validators/auth-schema";
declare class AuthService {
    signup(data: SignupInput): Promise<import("../repositories/user-repository").UserRow>;
}
declare const _default: AuthService;
export default _default;
//# sourceMappingURL=auth-service.d.ts.map