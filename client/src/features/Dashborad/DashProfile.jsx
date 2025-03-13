import { useState } from "react";
import { useSelector } from "react-redux";
import { useSignout } from "../../hooks/useSignout";
import { useDeleteUser } from "../users/useDeleteUser";
import UpdateUserForm from "../users/UpdateUserForm";
import DeletionModal from "../../components/DeletionModal";

const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [showModal, setShowModal] = useState(false);

  const { signout } = useSignout();

  const { deleteUser } = useDeleteUser();

  return (
    <div className="mx-auto w-full max-w-lg p-3">
      <h1 className="my-7 text-center text-3xl font-semibold">Profile</h1>
      <UpdateUserForm />
      <div className="mt-5 flex justify-between text-red-500">
        <span onClick={() => setShowModal(true)} className="cursor-pointer">
          Delete Account
        </span>
        <span onClick={signout} className="cursor-pointer">
          Sign Out
        </span>
      </div>

      <DeletionModal
        callback={() => deleteUser(currentUser._id)}
        modalHeader={"Are you sure you want to delete your account?"}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </div>
  );
};

export default DashProfile;
