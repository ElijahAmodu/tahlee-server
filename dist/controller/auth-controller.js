"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = void 0;
const zod_1 = require("zod");
const auth_schema_1 = require("../validators/auth-schema");
const auth_service_1 = __importDefault(require("../services/auth-service"));
const signup = async (req, res, next) => {
    try {
        const validationResult = auth_schema_1.signupSchema.safeParse(req.body);
        if (!validationResult.success) {
            return res.status(400).json({
                errors: zod_1.z.treeifyError(validationResult.error),
            });
        }
        const user = await auth_service_1.default.signup(validationResult.data);
        return res.status(201).json({
            success: true,
            message: "User signed up successfully",
            data: {
                id: user.id,
                email: user.email,
                name: user.name,
                created_at: user.created_at,
            },
        });
    }
    catch (error) {
        next(error);
    }
};
exports.signup = signup;
//# sourceMappingURL=auth-controller.js.map