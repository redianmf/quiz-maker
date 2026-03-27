import { startTestSchema, type StartTestType } from "@/schemas/test";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { startAttempt } from "@/repositories/test";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTestData } from "@/state/test";
import { TestStage } from "../../test.interface";

const useStartTest = () => {
  const setStage = useTestData((state) => state.setStage);
  const setAttempt = useTestData((state) => state.setAttempt);

  const form = useForm<StartTestType>({
    resolver: zodResolver(startTestSchema),
    defaultValues: {
      quizId: "",
    },
  });

  const mutation = useMutation({
    mutationFn: startAttempt,
    onSuccess: (attempt) => {
      const _attempt = {
        ...attempt,
      };

      _attempt.answers = attempt?.quiz?.questions?.map((question) => ({
        questionId: question?.id || 0,
        value: "",
      }));

      setAttempt(_attempt);
      setStage(TestStage[1]);
      toast.success("Quiz attempt started, please answer the questions", {
        duration: 2000,
        position: "top-right",
      });
    },
  });

  return { form, mutation };
};

export default useStartTest;
