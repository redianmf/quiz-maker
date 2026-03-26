import { TestStage } from "./test.interface";
import StartTest from "./components/start/start.component";
import TakeTest from "./components/take-test/take-test.component";
import Result from "./components/result/result.component";
import { useTestData } from "@/state/test";

const useTest = () => {
  const currentStage = useTestData((state) => state.stage);

  const renderContent = () => {
    switch (currentStage) {
      case TestStage[0]:
        return <StartTest />;
      case TestStage[1]:
        return <TakeTest />;
      case TestStage[2]:
        return <Result />;
      default:
        return null;
    }
  };

  return { renderContent };
};

export default useTest;
