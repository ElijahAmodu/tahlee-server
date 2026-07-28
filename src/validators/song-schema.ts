import z from "zod";

export const songSchema = z.object({
  name: z.string().min(1),
  artist: z.string().min(1),
  audio_url: z.string().min(1),
  image_url: z.string().optional(),
  duration: z.number().positive(),
});

export type songInput = z.infer<typeof songSchema>;
