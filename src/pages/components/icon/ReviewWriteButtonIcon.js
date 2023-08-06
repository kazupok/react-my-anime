import React from "react";
import { SiPostman } from "react-icons/si";
import { useCustomTheme } from "contexts/CustomThemeContext";
import {ButtonIcon} from "components/index";

const ReviewWriteButtonIcon = ({ size = "ll", onClick }) => {
  const theme = useCustomTheme().customTheme;

  return (
    <ButtonIcon
      icon={SiPostman}
      color={theme.icon2.color}
      size={size}
      onClick={onClick}
      style={{ position: "absolute", bottom: "1rem", right: "1.5rem" }}
    />
  );
};

export default ReviewWriteButtonIcon;