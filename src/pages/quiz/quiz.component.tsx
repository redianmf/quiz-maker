import { DataTable } from "@/components/ui/data-table";
import { columns } from "./quiz.static";
import useQuiz from "./quiz.service";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import QuizForm from "./quiz-builder/quiz-form.component";

const Quiz = () => {
  const {
    query,
    selectedQuiz,
    mutation,
    openModal,
    setOpenModal,
    navigate,
    handleEditQuiz,
  } = useQuiz();

  return (
    <div className="p-3">
      <div className="flex">
        <h1 className="font-bold mb-2">List of Quizzes</h1>
      </div>
      <DataTable
        columns={columns((quiz) => handleEditQuiz(quiz))}
        data={query.data || []}
        searchBy="title"
        isLoading={query.isLoading}
        onRowClick={(data) => navigate(`/quiz/details/${data.id}`)}
        actionButton={
          <Button onClick={() => setOpenModal(true)}>Create Quiz</Button>
        }
      />

      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>
              {selectedQuiz?.id ? "Edit" : "Create"} Quiz
            </DialogTitle>
          </DialogHeader>
          <QuizForm
            submit={(data) => mutation.mutate(data)}
            isLoading={mutation.isPending}
            defaultValues={selectedQuiz}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Quiz;
