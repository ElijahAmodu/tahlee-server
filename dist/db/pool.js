"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
exports.closePool = closePool;
const pg_1 = require("pg");
const env_1 = require("../config/env");
exports.pool = new pg_1.Pool({
    host: env_1.env.DB_HOST,
    port: Number(env_1.env.DB_PORT ?? 5432),
    user: env_1.env.DB_USER,
    password: env_1.env.DB_PASSWORD,
    database: env_1.env.DB_NAME,
    max: 10,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 5_000,
});
exports.pool.on("error", (err) => {
    console.error("Unexpected PG pool error", err);
});
async function closePool() {
    await exports.pool.end();
}
//# sourceMappingURL=pool.js.map