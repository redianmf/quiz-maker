import { z } from "zod";

export const startTestSchema = z.object({
  quizId: z.string().min(1, "Title is required"),
});

export const takeTestSchema = z.object({
  value: z.string().min(1, "Answer is required"),
});

export type StartTestType = z.infer<typeof startTestSchema>;
export type TakeTestType = z.infer<typeof takeTestSchema>;
