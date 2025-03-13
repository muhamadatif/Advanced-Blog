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
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      setShowModal(false);
      toast.success("Comment deleted successfully");
    },
    onError: (error) => {
      toast.error(error);
      setShowModal(false);
    },
  });

  return { deleteComment, isDeleting, showModal, setShowModal };
};
