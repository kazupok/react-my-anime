import React from "react";
import { FaStar as FullStar, FaRegStar as EmptyStar } from "react-icons/fa";
import { useCustomTheme } from "../../../context/style/CustomThemeContext";
import ToggleIcon from "../../../components/icon/ToggleIcon";

const StarIcon = ({ toggle, size = "2em", onClick }) => {
  const theme = useCustomTheme().customTheme;

  return (
    <ToggleIcon
      toggle={toggle}
      icon1={FullStar}
      icon2={EmptyStar}
      color1={theme.icon.color1}
      color2={theme.icon.color2}
      size={size}
      onClick={onClick}
    />
  );
};

export default StarIcon;
