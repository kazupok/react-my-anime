// GoogleAuth.js
import React from "react";

import { CustomButtonOnClick } from "components/index";

const GoogleLoginButton = () => {
  const signInWithGoogle = async () => {
    console.log("Google Login");
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
