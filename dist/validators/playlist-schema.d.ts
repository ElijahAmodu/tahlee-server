import z from "zod";
export declare const playlistSchema: z.ZodObject<{
    name: z.ZodString;
    image_url: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type playlistInput = z.infer<typeof playlistSchema>;
//# sourceMappingURL=playlist-schema.d.ts.map