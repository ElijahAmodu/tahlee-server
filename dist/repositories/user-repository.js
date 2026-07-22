"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../db/query");
class UserRepository {
    async create(data) {
        const rows = await (0, query_1.query)(`INSERT INTO users (email, password, name) 
       VALUES ($1, $2, $3) 
       RETURNING id, email, name, password, created_at`, [data.email, data.password, data.name]);
        const user = rows[0];
        if (!user) {
            throw new Error("Failed to create user");
        }
        return user;
    }
    async findByEmail(email) {
        const rows = await (0, query_1.query)(`SELECT * FROM users WHERE email = $1`, [
            email,
        ]);
        return rows[0] ?? null;
    }
    async findById(id) {
        const rows = await (0, query_1.query)(`SELECT id, email, name, created_at FROM users WHERE id = $1`, [id]);
        return rows[0] ?? null;
    }
}
exports.default = new UserRepository();
//# sourceMappingURL=user-repository.js.map