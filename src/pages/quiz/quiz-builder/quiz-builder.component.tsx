import { useState } from "react";
import QuizForm from "./quiz-form.component";
import QuestionForm from "./question-form.component";
import type { QuizFormValues, QuestionsFormValues } from "@/schemas/quiz";

const QuizBuilder = () => {
  const [step, setStep] = useState(1);

  const [quizData, setQuizData] = useState<QuizFormValues | null>(null);
  const [questionsData, setQuestionsData] =
    useState<QuestionsFormValues | null>(null);

  const handleFinalSubmit = (questions: QuestionsFormValues) => {
    const payload = {
      ...quizData,
      ...questions,
    };

    console.log("FINAL PAYLOAD", payload);
  };

  return (
    <div className="mx-auto h-full">
      {step === 1 && (
        <QuizForm
          defaultValues={quizData || undefined}
          submit={(data) => {
            setQuizData(data);
            setStep(2);
          }}
        />
      )}

      {step === 2 && (
        <QuestionForm
          defaultValues={questionsData || undefined}
          onBack={() => setStep(1)}
          onSubmit={(data) => {
            setQuestionsData(data);
            handleFinalSubmit(data);
          }}
        />
      )}
    </div>
  );
};

export default QuizBuilder;
