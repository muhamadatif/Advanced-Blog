import { useMutation, useQueryClient } from "@tanstack/react-query";
import { googleAuthApi } from "../../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useGoogleAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient(); // Get the queryClient instance
  const {
    mutate: googleAuth,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: googleAuthApi,
    onSuccess: (currentUser) => {
      queryClient.setQueryData(["user"], currentUser);
      navigate("/dashboard", { replace: true }); // Replaces the current entry in history. The user cannot go back to the previous page using the browser's "Back" button.
    },
    onError: (error) => {
      toast.error(error.message, { icon: "❌" });
    },
  });
  return { isLoading, googleAuth, error };
};
