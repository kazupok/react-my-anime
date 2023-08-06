import React from "react";
import { FaStar as FullStar, FaRegStar as EmptyStar } from "react-icons/fa";
import { useCustomTheme } from "../../../contexts/CustomThemeContext";
import ToggleIcon from "../../../components/icon/ToggleIcon";

const StarIcon = ({ toggle, size = "2em", onClick }) => {
  const theme = useCustomTheme().customTheme;

  return (
    <ToggleIcon
      toggle={toggle}
      icon1={FullStar}
      icon2={EmptyStar}
      color1={theme.icon.color}
      color2={theme.icon1.color}
      size={size}
      onClick={onClick}
    />
  );
};

export default StarIcon;
