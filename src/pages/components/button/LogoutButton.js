import React from "react";

import { auth } from "auth/firebaseConfig";
import { signOut } from "firebase/auth";

import CustomButtonOnClick from "components/button/CustomButtonOnClick";

const LogoutButton = () => {
    
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CustomButtonOnClick
      backgroundColor="transparent"
      borderColor="white"
      textColor="white"
      className="oval-button small-padding-button"
      onClick={handleLogout}
    >
      Log out
    </CustomButtonOnClick>
  );
};

export default LogoutButton;
