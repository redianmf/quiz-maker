import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createQuiz, getQuizzes, updateQuiz } from "@/repositories/quiz";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import type { IQuiz } from "./quiz.interface";

const useQuiz = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const query = useQuery({ queryKey: ["quiz"], queryFn: getQuizzes });

  const [openModal, setOpenModal] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<IQuiz>();

  const mutation = useMutation({
    mutationFn: (quiz: IQuiz) =>
      selectedQuiz?.id ? updateQuiz(selectedQuiz.id, quiz) : createQuiz(quiz),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quiz"] });
      setSelectedQuiz(undefined);
      setOpenModal(false);
      toast.success("Quiz submitted successfully", {
        duration: 2000,
        position: "top-right",
      });
    },
  });

  const handleEditQuiz = (quiz: IQuiz) => {
    setSelectedQuiz(quiz);
    setOpenModal(true);
  };

  return {
    query,
    queryClient,
    mutation,
    openModal,
    selectedQuiz,
    setOpenModal,
    navigate,
    handleEditQuiz,
  };
};

export default useQuiz;
