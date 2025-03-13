import { useInfiniteQuery } from "@tanstack/react-query";
import { getUsersApi } from "../../services/apiUsers";
import { useSelector } from "react-redux";

export const useGetUsers = (query) => {
  const { currentUser } = useSelector((state) => state.user);

  const {
    data,
    isPending: isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchNextPageError,
  } = useInfiniteQuery({
    queryKey: ["users", query],
    queryFn: getUsersApi,
    getNextPageParam: (lastPage, allPages) => {
      const currentFetchedUsers = allPages.flatMap((page) => page.users).length;
      return currentFetchedUsers < lastPage.totalUsers
        ? currentFetchedUsers
        : undefined;
    },
    enabled: currentUser.isAdmin,
    // Fetch only if admin
  });

  return { data, isLoading, fetchNextPage, hasNextPage, isFetchNextPageError };
};
