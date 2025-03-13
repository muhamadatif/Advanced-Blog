import { useSelector } from "react-redux";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getCommentsApi } from "../../services/apiComments";

export const useGetComments = (query) => {
  const { currentUser } = useSelector((state) => state.user);

  const {
    data,
    isPending: isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["comments", query],
    queryFn: getCommentsApi,
    getNextPageParam: (lastPage, allPages) => {
      const currentFetchedComments = allPages.flatMap(
        (page) => page?.comments,
      ).length;
      return currentFetchedComments < lastPage?.totalComments
        ? currentFetchedComments
        : undefined;
    },
    enabled: currentUser.isAdmin,
  });

  return { isLoading, data, hasNextPage, fetchNextPage, isFetchingNextPage };
};
