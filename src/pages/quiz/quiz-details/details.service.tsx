import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createQuestion,
  getQuizDetails,
  updateQuestion,
  deleteQuestion,
} from "@/repositories/quiz";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import type { IQuestion } from "../quiz.interface";
import { toast } from "sonner";

const useQuizDetails = () => {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["quizDetails"],
    queryFn: () => getQuizDetails(Number(id)),
  });

  const [openModal, setOpenModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<IQuestion>();

  const mutation = useMutation({
    mutationFn: (question: IQuestion) =>
      selectedQuestion?.id
        ? updateQuestion(selectedQuestion.id, question)
        : createQuestion(id, question),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quizDetails"] });
      setSelectedQuestion(undefined);
      setOpenModal(false);
      toast.success("Question submitted successfully", {
        duration: 2000,
        position: "top-right",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteQuestion(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quizDetails"] });
      toast.success("Question deleted successfully", {
        duration: 2000,
        position: "top-right",
      });
    },
  });

  const handleEditQuestion = (question: IQuestion) => {
    setSelectedQuestion(question);
    setOpenModal(true);
  };

  return {
    query,
    queryClient,
    openModal,
    mutation,
    deleteMutation,
    selectedQuestion,
    setOpenModal,
    navigate,
    handleEditQuestion,
  };
};

export default useQuizDetails;
