import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { signupApi } from "../../../services/apiAuth";

export function useSignup() {
  const navigate = useNavigate();
  const {
    mutate: signup,
    isPending: isLoading,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success("Account successfully created!");
      navigate("/sign-in");
    },
    onError: (err) => {
      toast.error(error.message, { icon: "❌" });
    },
  });

  return { isLoading, signup, isSuccess, error };
}
