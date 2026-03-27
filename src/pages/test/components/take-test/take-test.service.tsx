import { chooseAnswer, submitTest } from "@/repositories/test";
import { takeTestSchema, type TakeTestType } from "@/schemas/test";
import { useTestData } from "@/state/test";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { TestStage, type IAnswer } from "../../test.interface";
import type { ChooseAnswerPayload } from "./take-test.interface";

// const attempt = {
//   id: 3,
//   quizId: "1",
//   startedAt: "2026-03-26 12:43:13.160",
//   submittedAt: null,
//   answers: [
//     {
//       questionId: 1,
//       value: "",
//     },
//   ],
//   quiz: {
//     id: 1,
//     title: "JavaScript Basics",
//     description: "A tiny quiz on core JS",
//     timeLimitSeconds: 400,
//     questions: [
//       {
//         id: 1,
//         quizId: 1,
//         type: "mcq",
//         prompt: "Which of the following is NOT a primitive type in JavaScript?",
//         options: ["string", "number", "boolean", "array"],
//         position: 0,
//       },
//       {
//         id: 2,
//         quizId: 1,
//         type: "short",
//         prompt:
//           "What keyword declares a block-scoped variable introduced in ES6?",
//         position: 1,
//       },
//       {
//         id: 3,
//         quizId: 1,
//         type: "code",
//         prompt: "Write a function `sum(a,b)` that returns a + b.",
//         position: 2,
//       },
//     ],
//   },
// };

const useTakeTest = () => {
  const attempt = useTestData((state) => state.attempt);
  const setAnswerByIndex = useTestData((state) => state.setAnswerAtIndex);
  const setStage = useTestData((state) => state.setStage);
  const setAttemptResult = useTestData((state) => state.setAttemptResult);

  const [questionIdx, setQuestionIdx] = useState<number>(0);
  const currentQuestion = attempt?.quiz?.questions?.[questionIdx];
  const currentAnswer = attempt?.answers?.[questionIdx];
  const questionLength = attempt?.quiz?.questions?.length || 0;

  const isFirstQuestion = questionIdx === 0;
  const isLastQuestion = questionIdx === questionLength - 1;

  const form = useForm<TakeTestType>({
    resolver: zodResolver(takeTestSchema),
    defaultValues: {
      value: currentAnswer?.value || "",
    },
  });

  const chooseAnswerMutation = useMutation({
    mutationFn: ({ attemptId, data }: ChooseAnswerPayload) =>
      chooseAnswer(attemptId, data),
    onSuccess: () => {
      handleNext();
    },
    onError: () => {
      toast.error("Something went wrong, please try again", {
        duration: 2000,
        position: "top-right",
      });
    },
  });

  const submitMutation = useMutation({
    mutationFn: submitTest,
    onSuccess: (data) => {
      setAttemptResult(data);
      setStage(TestStage[2]);
      toast.success("Test submitted successfully", {
        duration: 2000,
        position: "top-right",
      });
    },
    onError: () => {
      toast.error("Something went wrong, please try again", {
        duration: 2000,
        position: "top-right",
      });
    },
  });

  const handlePrevious = () => {
    if (!isFirstQuestion) setQuestionIdx((prev) => prev - 1);
  };

  console.log(attempt, "attempt");

  const handleNext = () => {
    if (!isLastQuestion) setQuestionIdx((prev) => prev + 1);
  };

  const onSubmit = (data: TakeTestType) => {
    if (!currentQuestion?.id || !attempt?.id) return;

    const payload: IAnswer = {
      questionId: currentQuestion.id,
      value: data.value,
    };

    setAnswerByIndex(questionIdx, payload);
    chooseAnswerMutation.mutate({ attemptId: attempt.id, data: payload });

    if (isLastQuestion) submitMutation.mutate(attempt.id);
  };

  useEffect(() => {
    if (currentAnswer) {
      form.reset({
        value: currentAnswer.value,
      });
    }
  }, [questionIdx, currentAnswer]);

  useEffect(() => {
    if (!attempt?.id) setStage(TestStage[0]);
  }, []);

  return {
    form,
    questionIdx,
    currentQuestion,
    questionLength,
    isFirstQuestion,
    isLastQuestion,
    handlePrevious,
    handleNext,
    onSubmit,
  };
};

export default useTakeTest;
