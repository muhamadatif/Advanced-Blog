import { useMutation } from "@tanstack/react-query";
import { signinApi } from "../../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/user/userSlice";

export const useSignin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    mutate: signin,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: signinApi,
    onSuccess: (currentUser) => {
      dispatch(login(currentUser));

      navigate("/dashboard", { replace: true }); // Replaces the current entry in history. The user cannot go back to the previous page using the browser's "Back" button.
    },
    onError: (error) => {
      toast.error(error.message, { icon: "❌" });
    },
  });

  return { isLoading, signin, error };
};
