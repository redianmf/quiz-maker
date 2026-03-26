import { post } from "@/api";
import type { IAttempt } from "@/pages/test/test.interface";
import type { StartTestType } from "@/schemas/test";

export const startAttempt = async (data: StartTestType) => {
  const res = await post<IAttempt>("/attempts", data);
  return res;
};
