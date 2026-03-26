import { useFieldArray, useForm, useWatch, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { questionsSchema, type QuestionsFormValues } from "@/schemas/quiz";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";
import { Plus, Trash } from "lucide-react";
import { MultiInput } from "@/components/ui/multi-input";

interface IQuestionFormProps {
  defaultValues?: QuestionsFormValues;
  isLoading?: boolean;
  submit: (data: QuestionsFormValues) => void;
}

const QuestionForm = ({
  submit,
  isLoading,
  defaultValues,
}: IQuestionFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<QuestionsFormValues>({
    resolver: zodResolver(questionsSchema),
    defaultValues: {
      questions: [],
      ...defaultValues,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "questions",
  });

  const watchedQuestions = useWatch({
    control: control,
    name: "questions",
  });

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col h-full">
      <div className="flex-1 space-y-6 p-4 pb-24 max-h-[calc(100dvh-6rem)] overflow-y-auto">
        {fields.map((field, index) => {
          const type = watchedQuestions?.[index]?.type;

          return (
            <div
              key={field.id}
              className="border p-4 rounded space-y-4 max-w-2xl mx-auto"
            >
              <FieldGroup>
                <Field>
                  <FieldLabel>Question</FieldLabel>
                  <Input {...register(`questions.${index}.prompt`)} />
                  <FieldError>
                    {errors.questions?.[index]?.prompt?.message}
                  </FieldError>
                </Field>

                <Field>
                  <FieldLabel>Type</FieldLabel>
                  <Controller
                    control={control}
                    name={`questions.${index}.type`}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select question type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mcq">Multiple Choice</SelectItem>
                          <SelectItem value="saq">Short Answer</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </Field>

                {type === "mcq" && (
                  <Field>
                    <FieldLabel>Choices (comma separated)</FieldLabel>
                    <Controller
                      control={control}
                      name={`questions.${index}.options`}
                      render={({ field }) => (
                        <MultiInput
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                    <FieldError>
                      {errors.questions?.[index]?.options?.message}
                    </FieldError>
                  </Field>
                )}

                {type === "mcq" ? (
                  <Field>
                    <FieldLabel>Answer</FieldLabel>
                    <Controller
                      control={control}
                      name={`questions.${index}.correctAnswer`}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select answer" />
                          </SelectTrigger>
                          <SelectContent>
                            {watchedQuestions?.[index]?.options?.map(
                              (choice) => (
                                <SelectItem key={choice} value={choice}>
                                  {choice}
                                </SelectItem>
                              ),
                            )}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    <FieldError>
                      {errors.questions?.[index]?.correctAnswer?.message}
                    </FieldError>
                  </Field>
                ) : (
                  <Field>
                    <FieldLabel>Answer</FieldLabel>
                    <Input {...register(`questions.${index}.correctAnswer`)} />
                    <FieldError>
                      {errors.questions?.[index]?.correctAnswer?.message}
                    </FieldError>
                  </Field>
                )}
              </FieldGroup>

              <Button
                type="button"
                variant="destructive"
                onClick={() => remove(index)}
              >
                <Trash className="mr-1" /> Remove
              </Button>
            </div>
          );
        })}

        <div className="p-3">
          <Button
            variant="outline"
            className="w-full"
            onClick={() =>
              append({
                prompt: "",
                type: "mcq",
                options: [],
                correctAnswer: "",
              })
            }
          >
            <Plus className="mr-1" /> Add Question
          </Button>
        </div>
      </div>

      <div className="h-12 border-t bg-background flex justify-between items-center px-5">
        <Button disabled={isLoading} type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default QuestionForm;
