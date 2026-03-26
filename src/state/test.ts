import { create } from "zustand";
import {
  TestStage,
  type IAttempt,
  type TestStageType,
} from "../pages/test/test.interface";

type TestDataState = {
  stage: TestStageType;
  setStage: (stage: TestStageType) => void;

  attempt: IAttempt | null;
  setAttempt: (attempt: IAttempt | null) => void;
};

export const useTestData = create<TestDataState>((set) => ({
  stage: TestStage[0],
  setStage: (stage: TestStageType) => set({ stage }),

  attempt: null,
  setAttempt: (attempt: IAttempt | null) => set({ attempt }),
}));
