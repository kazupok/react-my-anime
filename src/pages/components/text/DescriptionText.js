import React from "react";
// useContext
import { useCustomTheme } from "contexts/CustomThemeContext";
// commponents
import {CustomLabel} from "components/index";


const DescriptionText = ({ title, size = "m" }) => {
  const theme = useCustomTheme().customTheme;

  const fontSizeMap = {
    s: "1rem",
    m: "1.2rem",
    l: "1.5rem",
  };

  return (
    <CustomLabel
      style={{
        ...theme.labelDescription,
        wordWrap: "break-word"
      }}
      fontSize={fontSizeMap[size]}
      fontWeight="bold"
    >
      {title}
    </CustomLabel>
  );
};

export default DescriptionText;
