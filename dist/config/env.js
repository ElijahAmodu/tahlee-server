"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
require("dotenv/config");
const zod_1 = require("zod");
const envSchema = zod_1.z.object({
    DB_HOST: zod_1.z.string().min(1),
    DB_PORT: zod_1.z.coerce.number().int().positive().default(5432),
    DB_USER: zod_1.z.string().min(1),
    DB_PASSWORD: zod_1.z.string().min(1),
    DB_NAME: zod_1.z.string().min(1),
});
const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
    console.error("Invalid environment variables:", zod_1.z.treeifyError(parsed.error));
    process.exit(1);
}
exports.env = parsed.data;
//# sourceMappingURL=env.js.map