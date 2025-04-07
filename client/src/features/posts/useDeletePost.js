import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePostApi } from "../../services/apiPosts";
import toast from "react-hot-toast";
import { useState } from "react";

export const useDeletePost = () => {
  const [showModal, setShowModal] = useState(false);
  const queryClient = useQueryClient();
  const {
    mutate: deletePost,
    isPending: isDeleting,
    error,
  } = useMutation({
    mutationFn: ({ postIdToDelete, userId }) =>
      deletePostApi(postIdToDelete, userId),
    onSuccess: () => {
      toast.success("Post deleted succesffully");
      setShowModal(false);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      console.log(error);

      toast.error(error.message, { icon: "❌" });
      setShowModal(false);
    },
  });
  return { deletePost, isDeleting, error, showModal, setShowModal };
};
