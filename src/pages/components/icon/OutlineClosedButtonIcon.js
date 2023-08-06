import React from "react";
import { MdCloseFullscreen } from "react-icons/md";
import { useCustomTheme } from "contexts/CustomThemeContext";
import {ButtonIcon} from "components/index";

const OutlineClosedButtonIcon = ({ size = "l", onClick }) => {
  const theme = useCustomTheme().customTheme;

  return (
    <ButtonIcon
      icon={MdCloseFullscreen}
      color={theme.icon.color}
      size={size}
      onClick={onClick}
    />
  );
};

export default OutlineClosedButtonIcon;