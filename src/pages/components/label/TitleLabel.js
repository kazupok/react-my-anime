import React from "react";
import { useCustomTheme } from "../../../context/style/CustomThemeContext";
import CustomLabel from "../../../components/label/CustomLabel";

const TitleLabel = ({ title, size = "m" }) => {
  const theme = useCustomTheme().customTheme;

  const fontSizeMap = {
    s: "1.2rem",
    m: "1.3rem",
    l: "2.8rem",
  };

  return (
    <CustomLabel
      style={{
        ...theme.label,
      }}
      fontSize={fontSizeMap[size]}
      fontWeight="bold"
    >
      {title}
    </CustomLabel>
  );
};

export default TitleLabel;
