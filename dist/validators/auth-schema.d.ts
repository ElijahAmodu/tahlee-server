import { z } from "zod";
export declare const signupSchema: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
    name: z.ZodString;
}, z.core.$strip>;
export type SignupInput = z.infer<typeof signupSchema>;
//# sourceMappingURL=auth-schema.d.ts.map