import type { ColumnDef } from "@tanstack/react-table";
import type { IQuestion } from "../quiz.interface";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const columns = (
  callbackEdit: (question: IQuestion) => void,
  callbackDelete: (question: IQuestion) => void,
): ColumnDef<IQuestion>[] => [
  {
    header: "No.",
    cell: ({ row }) => {
      return <div className="text-center max-w-3">{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "prompt",
    header: "Question",
    cell: ({ row }) => {
      const prompt = row.getValue("prompt") as string;
      return <div className="max-w-xs text-ellipsis">{prompt}</div>;
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type") as string;
      let typeDisplay: string;

      switch (type) {
        case "mcq":
          typeDisplay = "Multiple Choice";
          break;
        case "short":
          typeDisplay = "Short Answer";
          break;
        default:
          typeDisplay = "Other";
          break;
      }

      return <div>{typeDisplay}</div>;
    },
  },
  {
    accessorKey: "correctAnswer",
    header: "Answer",
  },
  {
    accessorKey: "position",
    header: "Position",
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
                callbackEdit(rowData);
              }}
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit Question
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                e.stopPropagation();
                callbackDelete(rowData);
              }}
              className="text-red-600"
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete Question
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
