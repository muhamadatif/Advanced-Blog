import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPostApi } from "../../services/apiPosts";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: createPost, isPending: isCreating } = useMutation({
    mutationFn: createPostApi,
    onSuccess: (data) => {
      toast.success("You successfully created a post ");
      queryClient.setQueryData(["posts"], (oldPosts) => {
        return oldPosts ? [...oldPosts, data] : [data];
      });
      queryClient.refetchQueries(["posts"]); // Refetch after navigation
      navigate(`/post/${data.slug}`, { replace: true });
    },
    onError: (error) => {
      toast.error(error, { icon: "❌" });
    },
  });
  return { createPost, isCreating };
};
