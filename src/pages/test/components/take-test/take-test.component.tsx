import { Button } from "@/components/ui/button";
import useTakeTest from "./take-test.service";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const TakeTest = () => {
  const {
    form,
    questionIdx,
    currentQuestion,
    isFirstQuestion,
    isLastQuestion,
    onSubmit,
    handlePrevious,
  } = useTakeTest();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-full">
      <div className="h-full flex flex-col space-y-5 justify-center items-center p-3">
        <section className="shrink-0 font-semibold">
          Question {questionIdx + 1}
        </section>

        <section className="flex-1 mt-3 flex flex-col gap-3">
          <div>{currentQuestion?.prompt}</div>
          {currentQuestion?.type === "mcq" ? (
            <Field>
              <Controller
                name="value"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    {currentQuestion?.options?.map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option}>{option}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
              />
              <FieldError>{errors.value?.message}</FieldError>
            </Field>
          ) : (
            <Field>
              <Input {...register("value")} />
              <FieldError>{errors.value?.message}</FieldError>
            </Field>
          )}
        </section>

        <section className="shrink-0 w-full flex justify-between">
          {!isFirstQuestion && (
            <Button variant="secondary" type="button" onClick={handlePrevious}>
              Previous
            </Button>
          )}
          {isLastQuestion ? (
            <Button type="submit">Submit</Button>
          ) : (
            <Button type="submit" className="only:ml-auto">
              Next
            </Button>
          )}
        </section>
      </div>
    </form>
  );
};

export default TakeTest;
