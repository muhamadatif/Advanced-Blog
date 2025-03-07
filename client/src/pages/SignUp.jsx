import { Link } from "react-router-dom";
import { Logo } from "../components/Logo";
import SignupForm from "../features/authentication/signup/SignupForm";

const SignUp = () => {
  return (
    <div className="mt-20 min-h-screen">
      <div className="mx-auto flex max-w-3xl flex-col gap-5 p-3 md:flex-row md:items-center">
        {/* Left Side */}
        <Logo />
        {/* Right Side - Form */}
        <div className={"flex-1"}>
          <SignupForm />
          {/* Already have an account */}
          <div className="mt-5 flex gap-2 text-sm">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-500">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
