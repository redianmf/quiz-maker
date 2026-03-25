import { toast } from "sonner";

export const handleError = (error: unknown) => {
  const message =
    error instanceof Error ? error.message : "Something went wrong";

  toast.error(message, {
    duration: 2000,
    position: "top-right",
  });
};
