import { del, get, patch, post } from "@/api";
import type {
  IQuestion,
  IQuiz,
  IQuizDetails,
} from "@/pages/quiz/quiz.interface";

export const getQuizzes = async () => {
  const res = await get<IQuiz[]>("/quizzes");
  return res;
};

export const getQuizDetails = async (quizId: number) => {
  const res = await get<IQuizDetails>(`/quizzes/${quizId}`);
  return res;
};

export const createQuiz = async (quiz: IQuiz) => {
  const res = await post<IQuiz>("/quizzes", quiz);
  return res;
};

export const updateQuiz = async (quizId: number, quiz: IQuiz) => {
  const res = await patch<IQuiz>(`/quizzes/${quizId}`, quiz);
  return res;
};

export const createQuestion = async (quizId: string, question: IQuestion) => {
  const payload: IQuestion = { ...question };
  if (question.type !== "mcq") delete payload.options;

  const res = await post<IQuestion>(`/quizzes/${quizId}/questions`, payload);
  return res;
};

export const updateQuestion = async (
  questionId: number,
  question: IQuestion,
) => {
  const payload: IQuestion = { ...question };
  if (question.type !== "mcq") delete payload.options;

  const res = await patch<IQuestion>(`/questions/${questionId}`, payload);
  return res;
};

export const deleteQuestion = async (questionId: string) => {
  const res = await del<IQuestion>(`/questions/${questionId}`, {});
  return res;
};
