import type { IQuizDetails } from "../quiz/quiz.interface";

export const TestStage = {
  0: "start",
  1: "test",
  2: "result",
} as const;

export type TestStageType = (typeof TestStage)[keyof typeof TestStage];

export interface IAttempt {
  id: number;
  quizId: string;
  startedAt: string;
  submittedAt: string | null;
  answers: string[];
  quiz: IQuizDetails;
}
