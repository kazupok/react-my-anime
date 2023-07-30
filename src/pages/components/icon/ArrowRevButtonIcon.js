import React from "react";
import { BsFillArrowLeftSquareFill} from "react-icons/bs";
import { useCustomTheme } from "context/style/CustomThemeContext";
import {ButtonIcon} from "components/index";

const ArrowRevButtonIcon = ({ size = "ll", onClick }) => {
  const theme = useCustomTheme().customTheme;

  return (
    <ButtonIcon
      icon={BsFillArrowLeftSquareFill}
      color={theme.icon.color2}
      size={size}
      onClick={onClick}
    />
  );
};

export default ArrowRevButtonIcon;