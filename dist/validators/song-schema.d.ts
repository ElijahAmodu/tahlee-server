import z from "zod";
export declare const songSchema: z.ZodObject<{
    name: z.ZodString;
    artist: z.ZodString;
    audio_url: z.ZodString;
    image_url: z.ZodOptional<z.ZodString>;
    duration: z.ZodNumber;
}, z.core.$strip>;
export type songInput = z.infer<typeof songSchema>;
//# sourceMappingURL=song-schema.d.ts.map