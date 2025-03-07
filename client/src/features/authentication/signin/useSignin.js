import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signinApi } from "../../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useSignin = () => {
  const queryClient = useQueryClient(); // Get the queryClient instance

  const navigate = useNavigate();
  const {
    mutate: signin,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: signinApi,
    onSuccess: (currentUser) => {
      queryClient.setQueryData(["user"], currentUser);
      navigate("/dashboard", { replace: true }); // Replaces the current entry in history. The user cannot go back to the previous page using the browser's "Back" button.
    },
    onError: (error) => {
      console.log(error);

      toast.error(error.message);
    },
  });

  return { isLoading, signin, error };
};
