import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useCustomTheme } from "contexts/CustomThemeContext";
import {ButtonIcon} from "components/index";

const TrashButtonIcon = ({ size = "l", onClick }) => {
  const theme = useCustomTheme().customTheme;

  return (
    <ButtonIcon
      icon={FaTrashAlt}
      color={theme.icon3.color}
      size={size}
      onClick={onClick}
    />
  );
};

export default TrashButtonIcon;