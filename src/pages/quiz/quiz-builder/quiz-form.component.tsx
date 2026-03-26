import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { quizSchema, type QuizFormValues } from "@/schemas/quiz";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";
import type { IQuiz } from "../quiz.interface";

interface IQuizFormProps {
  defaultValues?: IQuiz;
  isLoading?: boolean;
  submit: (data: QuizFormValues) => void;
}

const QuizForm = ({ isLoading, defaultValues, submit }: IQuizFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<QuizFormValues>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      title: "",
      description: "",
      timeLimitSeconds: 0,
      isPublished: false,
      ...defaultValues,
    },
  });

  const isPublished = watch("isPublished");

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col h-full">
      <div className="grow space-y-3 pb-5">
        <FieldGroup>
          <Field>
            <FieldLabel>Title</FieldLabel>
            <Input {...register("title")} />
            <FieldError>{errors.title?.message}</FieldError>
          </Field>

          <Field>
            <FieldLabel>Description</FieldLabel>
            <Input {...register("description")} />
            <FieldError>{errors.description?.message}</FieldError>
          </Field>

          <Field>
            <FieldLabel>Time Limit (s)</FieldLabel>
            <Input {...register("timeLimitSeconds", { valueAsNumber: true })} />
            <FieldError>{errors.timeLimitSeconds?.message}</FieldError>
          </Field>

          <Field orientation="horizontal">
            <FieldLabel>Published</FieldLabel>
            <Switch
              checked={isPublished}
              onCheckedChange={(val) =>
                setValue("isPublished", val, { shouldValidate: true })
              }
            />
          </Field>
        </FieldGroup>
      </div>

      <div className="h-12 bg-background flex justify-end items-center pt-3">
        <Button disabled={isLoading} type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default QuizForm;
