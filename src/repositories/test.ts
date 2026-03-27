import { post } from "@/api";
import type {
  IAnswer,
  IAttempt,
  IAttemptResult,
} from "@/pages/test/test.interface";
import type { StartTestType } from "@/schemas/test";

export const startAttempt = async (data: StartTestType) => {
  const res = await post<IAttempt>("/attempts", data);
  return res;
};

export const chooseAnswer = async (attemptId: number, data: IAnswer) => {
  const res = await post(`/attempts/${attemptId}/answer`, data);
  return res;
};

export const submitTest = async (attemptId: number) => {
  const res = await post<IAttemptResult>(`/attempts/${attemptId}/submit`);
  return res;
};
