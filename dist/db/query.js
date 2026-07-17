"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = query;
const pool_1 = require("./pool");
async function query(text, params) {
    const result = await pool_1.pool.query(text, params);
    return result.rows;
}
//# sourceMappingURL=query.js.map