import { Link } from "react-router-dom";

import { Logo } from "../components/Logo";
import SigninForm from "../features/authentication/signin/SigninForm";

const SignIn = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto flex max-w-3xl flex-col justify-center gap-5 p-3 md:flex-row md:items-center">
        {/* left */}
        <Logo />
        {/* right */}
        <div className="flex-1">
          <SigninForm />
          <div className="mt-5 flex gap-2 text-sm">
            <span>Don&apos;t Have an account?</span>
            <Link to="/sign-up" className="text-blue-500">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
