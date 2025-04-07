import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCommentApi } from "../../services/apiComments";
import toast from "react-hot-toast";
import { useState } from "react";

export const useDeleteComment = () => {
  const [showModal, setShowModal] = useState(false);
  const queryClient = useQueryClient();
  const { mutate: deleteComment, isPending: isDeleting } = useMutation({
    mutationFn: deleteCommentApi,
    onSuccess: () => {
      toast.success("Comment deleted successfully");
      setShowModal(false);
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
    onError: (error) => {
      toast.error(error.message, { icon: "❌" });
      setShowModal(false);
    },
  });

  return { deleteComment, isDeleting, showModal, setShowModal };
};
