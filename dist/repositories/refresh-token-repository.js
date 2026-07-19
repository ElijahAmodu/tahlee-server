"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../db/query");
class RefreshTokenRepository {
    async create(data) {
        await (0, query_1.query)(`INSERT INTO refresh_tokens (user_id, token_hash, expires_at)
        VALUES ($1, $2, $3)`, [data.userId, data.tokenHash, data.expiresAt]);
    }
    async findHash(tokenHash) {
        const rows = await (0, query_1.query)("SELECT * FROM refresh_tokens WHERE token_hash = $1", [tokenHash]);
        return rows[0] ?? null;
    }
    async deleteByHash(tokenHash) {
        await (0, query_1.query)("DELETE FROM refresh_tokens WHERE token_hash = $1", [
            tokenHash,
        ]);
    }
}
exports.default = new RefreshTokenRepository();
//# sourceMappingURL=refresh-token-repository.js.map