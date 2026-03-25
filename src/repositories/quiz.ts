import { get } from "@/api";
import type { IQuiz } from "@/pages/quiz/quiz.interface";

export const getQuizzes = async () => {
  const res = await get<IQuiz[]>("/quizzes");
  return res;
};
