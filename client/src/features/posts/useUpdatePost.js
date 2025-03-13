import { useMutation } from "@tanstack/react-query";
import { updatePostApi } from "../../services/apiPosts";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useUpdatePost = () => {
  const navigate = useNavigate();
  const {
    mutate: updatePost,
    isPending: isUpdating,
    error,
  } = useMutation({
    mutationFn: ({ postId, userId, updateData }) =>
      updatePostApi(postId, userId, updateData),
    onSuccess: (data) => {
      toast.success("Post updated successfully");
      navigate(`/post/${data.slug}`, { replace: true });
    },
    onError: (error) => {
      toast.error(error, { icon: "❌" });
    },
  });

  return { updatePost, isUpdating, error };
};
