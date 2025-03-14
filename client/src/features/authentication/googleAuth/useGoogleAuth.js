import { useMutation } from "@tanstack/react-query";
import { googleAuthApi } from "../../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/user/userSlice";

export const useGoogleAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    mutate: googleAuth,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: googleAuthApi,
    onSuccess: (currentUser) => {
      dispatch(login(currentUser));
      currentUser.isAdmin
        ? navigate("/dashboard?tab=dash", { replace: true })
        : navigate("/", { replace: true }); // Replaces the current entry in history. The user cannot go back to the previous page using the browser's "Back" button.
    },
    onError: (error) => {
      toast.error(error.message, { icon: "❌" });
    },
  });
  return { isLoading, googleAuth, error };
};
