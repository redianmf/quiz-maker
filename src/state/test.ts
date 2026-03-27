import { create } from "zustand";
import {
  TestStage,
  type IAnswer,
  type IAttempt,
  type IAttemptResult,
  type TestStageType,
} from "../pages/test/test.interface";
import type { IRecordEvent } from "@/pages/test/components/take-test/take-test.interface";

type TestDataState = {
  stage: TestStageType;
  setStage: (stage: TestStageType) => void;

  attempt: IAttempt | null;
  setAttempt: (attempt: IAttempt | null) => void;
  setAnswerAtIndex: (index: number, value: IAnswer) => void;

  attemptResult: IAttemptResult | null;
  setAttemptResult: (result: IAttemptResult | null) => void;

  events: IRecordEvent[] | null;
  setEvent: (event: IRecordEvent) => void;
  setEvents: (events: IRecordEvent[] | null) => void;
};

export const useTestData = create<TestDataState>((set) => ({
  stage: TestStage[0],
  setStage: (stage: TestStageType) => set({ stage }),

  attempt: null,
  setAttempt: (attempt: IAttempt | null) => set({ attempt }),
  setAnswerAtIndex: (index: number, value: IAnswer) => {
    set((state) => {
      if (!state.attempt) return state;
      const answers = [...(state.attempt.answers || [])];

      while (answers.length <= index) {
        answers.push({ questionId: 0, value: "" });
      }

      answers[index] = value;

      return {
        attempt: {
          ...state.attempt,
          answers,
        },
      };
    });
  },

  attemptResult: null,
  setAttemptResult: (result: IAttemptResult | null) =>
    set({ attemptResult: result }),

  events: null,
  setEvent: (event) =>
    set((state) => ({
      events: state.events ? [...state.events, event] : [event],
    })),
  setEvents: (events: IRecordEvent[] | null) => set({ events }),
}));
