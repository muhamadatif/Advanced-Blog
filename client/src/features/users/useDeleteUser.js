import { useMutation } from "@tanstack/react-query";
import { deleteUserApi } from "../../services/apiUser";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useDeleteUser = () => {
  const navigate = useNavigate();
  const {
    mutate: deleteUser,
    isPending: isDeleting,
    error,
  } = useMutation({
    mutationFn: deleteUserApi,
    onSuccess: () => {
      navigate("/sign-up");
    },
    onError: (error) => {
      toast(error.message, { icon: "❌" });
    },
  });
  return { deleteUser, isDeleting, error };
};
