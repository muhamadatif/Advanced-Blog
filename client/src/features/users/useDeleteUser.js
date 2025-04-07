import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserApi } from "../../services/apiUsers";
import toast from "react-hot-toast";
import { useState } from "react";

export const useDeleteUser = () => {
  const [showModal, setShowModal] = useState(false);

  const queryClient = useQueryClient();
  const { mutate: deleteUser, isPending: isDeleting } = useMutation({
    mutationFn: deleteUserApi,
    onSuccess: () => {
      toast.success("User deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      toast.error(error.message, { icon: "❌" });
    },
  });
  return {
    deleteUser,
    isDeleting,
    showModal,
    setShowModal,
  };
};
