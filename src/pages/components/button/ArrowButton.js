import React from "react";

import {CustomButtonOnClick} from "components/index";

const ArrowButton = ({ onClick }) => {

  return (
        <CustomButtonOnClick
          backgroundColor="transparent"
          borderColor="white"
          textColor="white"
          className="radius-button bt-w-size-ss bt-font-size-l bt-pad-m bt-trans bt-trans-s"
          onClick={onClick}
        >
          ←
        </CustomButtonOnClick>
      );
};

export default ArrowButton;