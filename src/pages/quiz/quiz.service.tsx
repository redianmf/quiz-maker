import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getQuizzes } from "@/repositories/quiz";

const useQuiz = () => {
  const queryClient = useQueryClient();
  const query = useQuery({ queryKey: ["quiz"], queryFn: getQuizzes });

  return { query, queryClient };
};

export default useQuiz;
