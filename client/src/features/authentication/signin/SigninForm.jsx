import { FormProvider, useForm } from "react-hook-form";
import { FormField } from "../../../components/FormField";
import { Alert, Button, Spinner } from "flowbite-react";
import OAuth from "../../../components/OAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinSchema } from "../../../schemas/authSchema";
import { useSignin } from "./useSignin";

const SigninForm = () => {
  const { isLoading, signin, error } = useSignin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signinSchema),
  });

  const onSubmit = (data) => {
    signin(data);
  };
  return (
    <FormProvider>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          label="Your Email"
          type="email"
          placeholder="name@company.com"
          id="email"
          register={register}
          isLoading={isLoading}
          error={errors?.email}
        />
        <FormField
          label="Your Password"
          type="password"
          placeholder="*************"
          id="password"
          register={register}
          isLoading={isLoading}
          error={errors?.password}
        />
        {/* Button */}
        <Button
          gradientDuoTone="purpleToPink"
          type="submit"
          className={`transition-all duration-300 ${isLoading ? "cursor-not-allowed opacity-50" : ""}`}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Spinner size="sm" />
              <span className="pl-3">Creating Account...</span>
            </>
          ) : (
            "Sign in"
          )}
        </Button>

        <OAuth />
      </form>
      {error && (
        <Alert className="mt-5" color="failure">
          {error}
        </Alert>
      )}
    </FormProvider>
  );
};

export default SigninForm;
