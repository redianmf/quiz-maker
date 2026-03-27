import type { IAnswer } from "../../test.interface";

export const RecordEventType = {
  paste: "Text pasted",
  switch: "Tab switched",
} as const;

export type RecordEventValue =
  (typeof RecordEventType)[keyof typeof RecordEventType];

export type ChooseAnswerPayload = {
  attemptId: number;
  data: IAnswer;
};

export interface IRecordEvent {
  id?: number;
  attempt_id?: number;
  event: RecordEventValue;
  timestamp?: string;
}

export interface RecordEventPayload {
  attemptId: number;
  data: IRecordEvent;
}
