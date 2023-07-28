import React from "react";
// useContext
import { useCustomTheme } from "context/style/CustomThemeContext";
// commponents
import {CustomLabel} from "components/index";


const CommentText = ({ title, size = "m" }) => {
  const theme = useCustomTheme().customTheme;

  const fontSizeMap = {
    s: "0.8rem",
    m: "1rem",
    l: "1.3rem",
  };

  return (
    <CustomLabel
      style={{
        ...theme.labelComment,
        wordWrap: "break-word"
      }}
      fontSize={fontSizeMap[size]}
      fontWeight="bold"
    >
      {title}
    </CustomLabel>
  );
};

export default CommentText;
