import type { ColumnDef } from "@tanstack/react-table";
import type { IQuiz } from "./quiz.interface";
import moment from "moment";
import { MoreHorizontal, Pencil, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { copyToClipboard } from "@/lib/common";

export const columns = (
  callback: (quiz: IQuiz) => void,
): ColumnDef<IQuiz>[] => [
  {
    header: "No.",
    cell: ({ row }) => {
      return <div className="text-center">{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "id",
    header: "Quiz ID",
    cell({ row }) {
      const id = row.getValue("id");
      if (!id) {
        return <>-</>;
      }

      return (
        <>
          {id}{" "}
          <Button
            variant="outline"
            size="icon-xs"
            onClick={(e) => {
              e.stopPropagation();
              copyToClipboard(id as string);
            }}
          >
            <Copy className="h-2 w-2" />
          </Button>
        </>
      );
    },
  },
  {
    accessorKey: "timeLimitSeconds",
    header: "Time Limit (s)",
  },
  {
    accessorKey: "isPublished",
    header: "Published",
    cell({ row }) {
      const isPublished = row.getValue("isPublished");
      return <>{isPublished ? "Yes" : "No"}</>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell({ row }) {
      const createdAt = row.getValue("createdAt");
      if (!createdAt) {
        return <>-</>;
      }

      const formattedDate = moment(createdAt).format("DD/MM/YYYY");
      return <>{formattedDate}</>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const rowData = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                e.stopPropagation();
                callback(rowData);
              }}
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit Quiz
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
