import React from "react";
import CustomButtonOnClick from "components/button/CustomButtonOnClick";
// useContext
import { useAuthContext } from "contexts/AuthContext";


const LogoutButton = () => {
  const { logout } = useAuthContext();

  const handleLogout = () => {
    logout();
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
