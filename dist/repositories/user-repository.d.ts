export interface UserRow {
    id: string;
    email: string;
    password: string;
    name: string;
    created_at: Date;
}
declare class UserRepository {
    create(data: {
        email: string;
        password: string;
        name: string;
    }): Promise<UserRow>;
    findByEmail(email: string): Promise<UserRow | null>;
}
declare const _default: UserRepository;
export default _default;
//# sourceMappingURL=user-repository.d.ts.map