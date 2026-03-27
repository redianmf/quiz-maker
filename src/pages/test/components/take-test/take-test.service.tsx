import { chooseAnswer, recordEvent, submitTest } from "@/repositories/test";
import { takeTestSchema, type TakeTestType } from "@/schemas/test";
import { useTestData } from "@/state/test";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { TestStage, type IAnswer } from "../../test.interface";
import {
  RecordEventType,
  type ChooseAnswerPayload,
  type RecordEventPayload,
} from "./take-test.interface";

const useTakeTest = () => {
  const attempt = useTestData((state) => state.attempt);
  const setAnswerByIndex = useTestData((state) => state.setAnswerAtIndex);
  const setStage = useTestData((state) => state.setStage);
  const setAttemptResult = useTestData((state) => state.setAttemptResult);
  const setEvent = useTestData((state) => state.setEvent);

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

  const eventMutation = useMutation({
    mutationFn: ({ attemptId, data }: RecordEventPayload) =>
      recordEvent(attemptId, data),
  });

  const handlePrevious = () => {
    if (!isFirstQuestion) setQuestionIdx((prev) => prev - 1);
  };

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

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const pastedText = e.clipboardData?.getData("text");
      if (!pastedText || !attempt?.id) return;

      eventMutation.mutate({
        attemptId: attempt.id,
        data: { event: RecordEventType.paste },
      });

      setEvent({
        event: RecordEventType.paste,
        attempt_id: attempt.id,
        timestamp: new Date().toISOString(),
      });
    };

    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden" && attempt?.id) {
        eventMutation.mutate({
          attemptId: attempt.id,
          data: { event: RecordEventType.switch },
        });

        setEvent({
          event: RecordEventType.switch,
          attempt_id: attempt.id,
          timestamp: new Date().toISOString(),
        });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
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
