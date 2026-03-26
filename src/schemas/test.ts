import { z } from "zod";

export const startTestSchema = z.object({
  quizId: z.string().min(1, "Title is required"),
});

export type StartTestType = z.infer<typeof startTestSchema>;
