import z from "zod";

export const playlistSchema = z.object({
  name: z.string().min(1),
  image_url: z.string().optional(),
});

export type playlistInput = z.infer<typeof playlistSchema>;
