import { useForm } from "react-hook-form";
import { FormField } from "../../../components/FormField";
import { Alert } from "flowbite-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinSchema } from "../../../schemas/authSchema";
import { useSignin } from "./useSignin";
import OAuth from "../googleAuth/OAuth";
import LoadingButton from "../../../components/LoadingButton";

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
    <>
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
        <LoadingButton isLoading={isLoading} text="Sign in" />
        <OAuth />
      </form>
      {error && (
        <Alert className="mt-5" color="failure">
          {error.message}
        </Alert>
      )}
    </>
  );
};

export default SigninForm;
