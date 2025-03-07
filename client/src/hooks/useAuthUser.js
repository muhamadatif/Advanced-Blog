import { useQueryClient } from "@tanstack/react-query";

export const useAuthUser = () => {
  const queryClient = useQueryClient();
  console.log(queryClient.getQueryData(["user"]));

  return queryClient.getQueryData(["user"]); // Get cached user
};
