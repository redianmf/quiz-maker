import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTestData } from "@/state/test";
import { Check, X } from "lucide-react";

const Result = () => {
  const attemptResult = useTestData((state) => state.attemptResult);

  return (
    <div className="h-full flex flex-col space-y-5 p-3">
      <section className="shrink-0 font-bold">Test Result</section>
      <section className="flex-1 flex flex-col gap-3">
        <div className="text-sm font-semibold">
          Overall Score : {attemptResult?.score || 0}
        </div>
        <Table className="text-sm">
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">No.</TableHead>
              <TableHead>Expected Answer</TableHead>
              <TableHead>Remarks</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attemptResult?.details?.map((question, idx) => (
              <TableRow key={question?.questionId}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{question?.expected || "-"}</TableCell>
                <TableCell>
                  {question?.correct ? (
                    <div className="flex gap-1 items-center font-semibold text-green-500">
                      <Check className="h-4 w-4" />
                      <p>Correct</p>
                    </div>
                  ) : (
                    <div className="flex gap-1 items-center font-semibold text-red-500">
                      <X className="h-4 w-4" />
                      <p>Incorrect</p>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
};

export default Result;
