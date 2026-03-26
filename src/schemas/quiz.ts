import { z } from "zod";

export const quizSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  isPublished: z.boolean(),
  timeLimitSeconds: z.number().min(1, "Time limit is required"),
});

// schemas/quiz.ts
export const questionSchema = z
  .object({
    prompt: z.string().min(1, "Question is required"),
    type: z.enum(["mcq", "short"]),
    options: z.array(z.string().min(1)).optional(),
    correctAnswer: z.string().min(1, "Answer is required"),
    position: z.number().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.type === "mcq") {
      if (!data.options || data.options.length < 2) {
        ctx.addIssue({
          code: "custom",
          message: "At least 2 options required",
          path: ["options"],
        });
      }

      const index = Number(data.correctAnswer);

      if (
        !data.options ||
        isNaN(index) ||
        index < 0 ||
        index >= data.options.length
      ) {
        ctx.addIssue({
          code: "custom",
          message: "Answer must match one of the options",
          path: ["correctAnswer"],
        });
      }
    }
  });

export const questionsSchema = z.object({
  questions: z.array(questionSchema).min(1, "At least one question"),
});

export type QuizFormValues = z.infer<typeof quizSchema>;
export type QuestionFormValues = z.infer<typeof questionSchema>;
export type QuestionsFormValues = z.infer<typeof questionsSchema>;
