import { useQuery } from "@tanstack/react-query";
import { getPostApi } from "../../services/apiPosts";
import { useParams } from "react-router-dom";

export const useGetPost = () => {
  const { postSlug } = useParams();

  const {
    data: post,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ["post", postSlug],
    queryFn: () => getPostApi(postSlug),
  });

  return { post, isLoading, error };
};
