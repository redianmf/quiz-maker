import { DataTable } from "@/components/ui/data-table";
import { columns } from "./details.static";
import useQuizDetails from "./details.service";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { copyToClipboard } from "@/lib/common";
import { Copy, ArrowBigLeft } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import QuestionFormSingle from "../quiz-builder/question-form-single.component";

const QuizDetails = () => {
  const {
    query,
    openModal,
    mutation,
    deleteMutation,
    selectedQuestion,
    setOpenModal,
    navigate,
    handleEditQuestion,
  } = useQuizDetails();

  return (
    <div className="p-3">
      <section className="flex justify-between">
        <h1 className="font-bold mb-2">
          <Button
            variant="outline"
            size="icon-xs"
            className="mr-2"
            onClick={() => navigate("/quiz")}
          >
            <ArrowBigLeft className="h-2 w-2" />
          </Button>
          Quiz Details
        </h1>
      </section>
      <section className="grid grid-cols-2 py-2 border-b">
        <div>
          <DetailItem title="Quiz ID" description={query.data?.id} showCopy />
          <DetailItem title="Title" description={query.data?.title} />
          <DetailItem
            title="Description"
            description={query.data?.description}
          />
        </div>
        <div>
          <DetailItem
            title="Time Limit (s)"
            description={query.data?.timeLimitSeconds}
          />
          <DetailItem
            title="Published"
            description={query.data?.isPublished ? "Yes" : "No"}
          />
          <DetailItem
            title="Created At"
            description={moment(query.data?.createdAt).format("DD/MM/YYYY")}
          />
        </div>
      </section>
      <DataTable
        columns={columns(
          (question) => handleEditQuestion(question),
          (question) => deleteMutation.mutate(String(question.id)),
        )}
        data={query.data?.questions || []}
        searchBy="prompt"
        isLoading={query.isLoading}
        actionButton={
          <Button onClick={() => setOpenModal(true)}>Add Question</Button>
        }
      />

      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Add Question</DialogTitle>
          </DialogHeader>
          <div className="-mx-4 no-scrollbar max-h-[70vh] overflow-y-auto px-4">
            <QuestionFormSingle
              submit={(data) => mutation.mutate(data)}
              isLoading={mutation.isPending}
              defaultValues={selectedQuestion}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const DetailItem = ({
  title,
  description,
  showCopy = false,
}: {
  title: string;
  description?: string | number;
  showCopy?: boolean;
}) => {
  return (
    <div className="flex">
      <div className="w-30 text-sm font-semibold">{title}</div>
      <div className="w-3 text-sm">:</div>
      <div className="text-sm">
        {description || "-"}{" "}
        {showCopy && (
          <Button
            variant="outline"
            size="icon-xs"
            onClick={() => copyToClipboard(description?.toString() || "")}
          >
            <Copy className="h-2 w-2" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuizDetails;
