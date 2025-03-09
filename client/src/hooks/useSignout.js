import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { signoutApi } from "../services/apiAuth";
import { useDispatch } from "react-redux";
import { logout } from "../redux/user/userSlice";

export const useSignout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    isPending: isLoading,
    mutate: signout,
    error,
  } = useMutation({
    mutationFn: signoutApi,
    onSuccess: () => {
      dispatch(logout());
      navigate("/sign-in");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isLoading, signout, error };
};
