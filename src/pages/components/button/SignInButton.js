import React from "react";
import { CustomButtonLink, CustomButtonSubmit} from "components/index";

const SignInButton = ({to}) => {
  return (
    <>
      {to ? (
        <CustomButtonLink
          to={to}
          backgroundColor="transparent"
          borderColor="#ff007f"
          textColor="white"
          className="oval-button bt-w-size-l bt-font-size-l bt-pad-m"
        >
          Sign In
        </CustomButtonLink>
      ) : (
        <CustomButtonSubmit
          backgroundColor="transparent"
          borderColor="#ff007f"
          textColor="white"
          className="oval-button bt-w-size-l bt-font-size-l bt-pad-m"
        >
          Sign In
        </CustomButtonSubmit>
      )}
    </>
  );
};

export default SignInButton;
