"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupSchema = void 0;
const zod_1 = require("zod");
exports.signupSchema = zod_1.z.object({
    email: zod_1.z.email("Invalid email address"),
    password: zod_1.z.string().min(8, "Password must be at least 6 characters long"),
    name: zod_1.z.string().min(1, "Name is required"),
});
//# sourceMappingURL=auth-schema.js.map