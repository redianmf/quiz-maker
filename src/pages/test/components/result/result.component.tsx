import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTestData } from "@/state/test";
import { ArrowBigLeft, Check, X } from "lucide-react";
import { TestStage } from "../../test.interface";
import { useQuery } from "@tanstack/react-query";
import { getRecordedEvent } from "@/repositories/test";
import { RecordEventType } from "../take-test/take-test.interface";

const Result = () => {
  const attempt = useTestData((state) => state.attempt);
  const attemptResult = useTestData((state) => state.attemptResult);
  const setStage = useTestData((state) => state.setStage);
  const event = useQuery({
    queryKey: ["events"],
    queryFn: () => getRecordedEvent(attempt?.id),
  });

  const result = event?.data?.reduce(
    (acc, item) => {
      const type = item.event;

      if (type == RecordEventType.switch) acc.tabSwitched++;
      if (type == RecordEventType.paste) acc.textPasted++;

      return acc;
    },
    { tabSwitched: 0, textPasted: 0 },
  );

  return (
    <div className="h-full flex flex-col space-y-5 p-3">
      <section className="shrink-0 font-bold">
        <Button
          variant="outline"
          size="icon-xs"
          className="mr-2"
          onClick={() => setStage(TestStage[0])}
        >
          <ArrowBigLeft className="h-2 w-2" />
        </Button>
        Test Result
      </section>
      <section className="flex-1 flex flex-col gap-3">
        <div className="text-sm font-semibold">
          <p>Overall Score : {attemptResult?.score || 0}</p>
          {event?.data && event?.data?.length > 0 && (
            <p className="text-red-500">
              {result?.tabSwitched || 0} times tab switched and{" "}
              {result?.textPasted || 0} times text pasted
            </p>
          )}
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
