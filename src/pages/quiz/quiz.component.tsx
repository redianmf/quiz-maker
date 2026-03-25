import { DataTable } from "@/components/ui/data-table";
import { columns } from "./quiz.static";
import useQuiz from "./quiz.service";

const Quiz = () => {
  const { query } = useQuiz();

  return (
    <>
      <h1 className="font-bold mb-2">List of Quizzes</h1>
      <DataTable
        columns={columns}
        data={query.data || []}
        searchBy="title"
        isLoading={query.isLoading}
      />
    </>
  );
};

export default Quiz;
