import { useInfiniteQuery } from "@tanstack/react-query";
import { getPostsApi } from "../../services/apiPosts";
import { useSelector } from "react-redux";

export const useGetPosts = (query) => {
  const { currentUser } = useSelector((state) => state.user);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending: isLoading,
  } = useInfiniteQuery({
    queryKey: ["posts", query],
    queryFn: getPostsApi,
    getNextPageParam: (lastPage, allPages) => {
      const currentFetchedPosts = allPages.flatMap((page) => page.posts).length;

      return currentFetchedPosts < lastPage.totalPosts
        ? currentFetchedPosts
        : undefined;
    },
    enabled: !!currentUser.isAdmin,
    // Fetch only if admin
  });

  return {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};
