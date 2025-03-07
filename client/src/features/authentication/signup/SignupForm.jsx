import { FormProvider, useForm } from "react-hook-form";
import { TextFormField } from "../../../components/FormField";
import { Alert, Button, Spinner } from "flowbite-react";
import OAuth from "../../../components/OAuth";
import { useSignup } from "./useSignup";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../../../schemas/authSchema";

const SignupForm = () => {
  const { isLoading, signup, error } = useSignup();

  // 🔹 Integrate React Hook Form with Zod
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
        <TextFormField
          label="Your Username"
          placeholder="Username"
          id="username"
          register={register}
          isLoading={isLoading}
          error={errors?.username}
        />

        <TextFormField
          label="Your Email"
          placeholder="Email"
          id="email"
          register={register}
          isLoading={isLoading}
          error={errors?.email}
        />
        <TextFormField
          label="Your Password"
          placeholder="Password"
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
            "Sign Up"
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

export default SignupForm;
