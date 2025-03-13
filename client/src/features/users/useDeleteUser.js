import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserApi } from "../../services/apiUsers";
import toast from "react-hot-toast";
import { useState } from "react";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const { mutate: deleteUsers, isPending: isDeleting } = useMutation({
    mutationFn: deleteUserApi,
    onSuccess: () => {
      toast.success("User deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      toast.error(error, { icon: "❌" });
    },
  });
  return {
    deleteUsers,
    isDeleting,
    showModal,
    setShowModal,
  };
};
