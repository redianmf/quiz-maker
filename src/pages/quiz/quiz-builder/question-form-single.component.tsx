import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { questionSchema, type QuestionFormValues } from "@/schemas/quiz";
import ReactCodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
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
import { MultiInput } from "@/components/ui/multi-input";

interface IQuestionFormProps {
  defaultValues?: QuestionFormValues;
  isLoading?: boolean;
  submit: (data: QuestionFormValues) => void;
}

const QuestionFormSingle = ({
  submit,
  isLoading,
  defaultValues,
}: IQuestionFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<QuestionFormValues>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      correctAnswer: "",
      options: [],
      prompt: "",
      type: "mcq",
      position: 0,
      ...defaultValues,
    },
  });

  const selectedType = useWatch({
    control,
    name: "type",
  });

  const selectedOptions = useWatch({
    control,
    name: "options",
  });

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col h-full">
      <div className="flex-1 space-y-3 overflow-y-auto">
        <div className="mx-auto">
          <FieldGroup>
            <Field>
              <FieldLabel>Question</FieldLabel>
              <Input {...register("prompt")} />
              <FieldError>{errors.prompt?.message}</FieldError>
            </Field>

            {/* <Field>
              <FieldLabel>Code Snippet</FieldLabel>
              <Controller
                name="prompt"
                control={control}
                render={({ field }) => (
                  <ReactCodeMirror
                    value={field.value}
                    height="200px"
                    onChange={(value) => field.onChange(value)}
                    extensions={[javascript()]}
                  />
                )}
              />
            </Field> */}

            <Field>
              <FieldLabel>Code Snippet</FieldLabel>
              <ReactCodeMirror height="200px" extensions={[javascript()]} />
            </Field>

            <Field>
              <FieldLabel>Type</FieldLabel>
              <Controller
                control={control}
                name="type"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select question type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mcq">Multiple Choice</SelectItem>
                      <SelectItem value="short">Short Answer</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError>{errors.type?.message}</FieldError>
            </Field>

            {selectedType === "mcq" && (
              <Field>
                <FieldLabel>Options</FieldLabel>
                <Controller
                  control={control}
                  name="options"
                  render={({ field }) => (
                    <MultiInput value={field.value} onChange={field.onChange} />
                  )}
                />
                <FieldError>{errors.options?.message}</FieldError>
              </Field>
            )}

            {selectedType === "mcq" ? (
              <Field>
                <FieldLabel>Answer</FieldLabel>
                <Controller
                  control={control}
                  name="correctAnswer"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select answer" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedOptions?.map((choice, idx) => (
                          <SelectItem key={choice} value={idx?.toString()}>
                            {choice}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldError>{errors.correctAnswer?.message}</FieldError>
              </Field>
            ) : (
              <Field>
                <FieldLabel>Answer</FieldLabel>
                <Input {...register("correctAnswer")} />
                <FieldError>{errors.correctAnswer?.message}</FieldError>
              </Field>
            )}

            <Field>
              <FieldLabel>Position</FieldLabel>
              <Input {...register("position", { valueAsNumber: true })} />
              <FieldError>{errors.position?.message}</FieldError>
            </Field>
          </FieldGroup>
        </div>
      </div>

      <div className="h-12 bg-background flex justify-end items-center pt-3">
        <Button disabled={isLoading} type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default QuestionFormSingle;
