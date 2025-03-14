import { useForm } from "react-hook-form";
import { FormField } from "../../../components/FormField";
import { useSignup } from "./useSignup";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../../../schemas/authSchema";
import OAuth from "../googleAuth/OAuth";
import LoadingButton from "../../../components/LoadingButton";

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
    console.log(data);

    signup(data);
  };
  return (
    <>
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
        <LoadingButton isLoading={isLoading} text="Sign up" />

        <OAuth />
      </form>
    </>
  );
};

export default SignupForm;
