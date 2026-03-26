import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import useStartTest from "./start.service";
import { Button } from "@/components/ui/button";

const StartTest = () => {
  const { form, mutation } = useStartTest();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <div className="h-full flex flex-col gap-3 justify-center items-center">
      <h1>Input Quiz ID to Start Test...</h1>
      <form onSubmit={handleSubmit((data) => mutation.mutate(data))}>
        <Field>
          <Input {...register("quizId")} />
          <FieldError>{errors.quizId?.message}</FieldError>
        </Field>
        <Button className="w-full mt-3" type="submit">
          Start Test
        </Button>
      </form>
    </div>
  );
};

export default StartTest;
