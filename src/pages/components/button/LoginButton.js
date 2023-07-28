import React from "react";
import { CustomButtonLink, CustomButtonSubmit} from "components/index";

const LoginButton = ({to}) => {
  return (
    <>
      {to ? (
        <CustomButtonLink
          to={to}
          backgroundColor="transparent"
          borderColor="#7f00ff"
          textColor="white"
          className="oval-button bt-w-size-l bt-font-size-l bt-pad-m"
        >
          Login
        </CustomButtonLink>
      ) : (
        <CustomButtonSubmit
          backgroundColor="transparent"
          borderColor="#7f00ff"
          textColor="white"
          className="oval-button bt-w-size-l bt-font-size-l bt-pad-m"
        >
          Login
        </CustomButtonSubmit>
      )}
    </>
  );
};

export default LoginButton;
