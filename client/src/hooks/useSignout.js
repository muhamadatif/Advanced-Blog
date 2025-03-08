import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signoutApi } from "../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useSignout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    isPending: isLoading,
    mutate: signout,
    error,
  } = useMutation({
    mutationFn: signoutApi,
    onSuccess: () => {
      queryClient.removeQueries(["user"]);
      navigate("/sign-in");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isLoading, signout, error };
};
