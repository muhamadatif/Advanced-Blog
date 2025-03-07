import { FormProvider, useForm } from "react-hook-form";
import { FormField } from "../../../components/FormField";
import { Button, Spinner } from "flowbite-react";
import { useSignup } from "./useSignup";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../../../schemas/authSchema";
import OAuth from "../googleAuth/OAuth";

const SignupForm = () => {
  const { isLoading, signup } = useSignup();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data) => {
    signup(data);
  };
  return (
    <FormProvider>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          label="Your Username"
          type="text"
          placeholder="Username"
          id="username"
          register={register}
          isLoading={isLoading}
          error={errors?.username}
        />

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
              <span className="pl-3">Loading...</span>
            </>
          ) : (
            "Sign Up"
          )}
        </Button>

        <OAuth />
      </form>
    </FormProvider>
  );
};

export default SignupForm;
