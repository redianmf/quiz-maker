import type { ColumnDef } from "@tanstack/react-table";
import type { IQuiz } from "./quiz.interface";
import moment from "moment";
import { MoreHorizontal, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const columns: ColumnDef<IQuiz>[] = [
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
            <DropdownMenuItem onClick={() => console.log(rowData?.id)}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit Quiz
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
