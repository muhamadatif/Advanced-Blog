import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateUserApi } from "../../services/apiUser";
import { updatingUser } from "../../redux/user/userSlice";
export const useUpdateUser = () => {
  const dispatch = useDispatch();
  const {
    mutate: updateUser,
    isPending: isUpdating,
    error,
  } = useMutation({
    mutationFn: ({ userId, userData }) => updateUserApi(userId, userData),
    onSuccess: (data) => {
      dispatch(updatingUser(data));
      toast.success("User updated successfully");
    },
    onError: (error) => {
      toast.error(error.message, { icon: "❌" });
    },
  });

  return { isUpdating, updateUser, error };
};
