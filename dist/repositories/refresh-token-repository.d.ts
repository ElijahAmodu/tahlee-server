interface RefreshTokenRow {
    id: string;
    user_id: string;
    token_hash: string;
    expires_at: Date;
    revoked_at: Date | null;
}
declare class RefreshTokenRepository {
    create(data: {
        userId: string;
        tokenHash: string;
        expiresAt: Date;
    }): Promise<void>;
    findHash(tokenHash: string): Promise<RefreshTokenRow | null>;
    revokeByHash(tokenHash: string): Promise<void>;
    revokeAllForUser(userId: string): Promise<void>;
    deleteByHash(tokenHash: string): Promise<void>;
}
declare const _default: RefreshTokenRepository;
export default _default;
//# sourceMappingURL=refresh-token-repository.d.ts.map