import type { IAnswer } from "../../test.interface";

export type ChooseAnswerPayload = {
  attemptId: number;
  data: IAnswer;
};
