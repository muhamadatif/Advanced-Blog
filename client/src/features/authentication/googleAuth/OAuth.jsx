import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../../../firebase";

import { useGoogleAuth } from "./useGoogleAuth";

const OAuth = () => {
  const auth = getAuth(app);
  const { googleAuth } = useGoogleAuth();
  const provider = new GoogleAuthProvider();
  // it make the auth provider ask the client for which account he want to sign in with each time he want to sign in
  provider.setCustomParameters({ prompt: "select_account" });
  const handleGoogleClick = async () => {
    googleAuth({ signInWithPopup, auth, provider });
  };

  return (
    <Button
      type="button"
      gradientDuoTone="pinkToOrange"
      outline
      onClick={handleGoogleClick}
    >
      <AiFillGoogleCircle className="mr-2 h-6 w-6" />
      Continue with Google
    </Button>
  );
};

export default OAuth;
