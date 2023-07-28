// GoogleAuth.js
import React from "react";

import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "auth/firebaseConfig";

import { CustomButtonOnClick } from "components/index";

const GoogleLoginButton = () => {
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider).catch((err) =>
        alert(err.message)
      );
    } catch (error) {
      console.error("Error during Google Sign In: ", error);
    }
  };

  return (
    <CustomButtonOnClick
      backgroundColor="transparent"
      borderColor="#007fff"
      textColor="white"
      className="oval-button bt-w-size-l bt-font-size-l bt-pad-m"
      onClick={signInWithGoogle}
    >
      Google
    </CustomButtonOnClick>
  );
};

export default GoogleLoginButton;
