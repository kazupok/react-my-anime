import React from "react";
import { BsBookmarkStarFill, BsBookmarkStar} from "react-icons/bs";
import { useCustomTheme } from "../../../context/style/CustomThemeContext";
import ToggleIcon from "../../../components/icon/ToggleIcon";

const FavoriteIcon = ({ toggle, size = "2em", onClick }) => {
  const theme = useCustomTheme().customTheme;

  return (
    <ToggleIcon
      toggle={toggle}
      icon1={BsBookmarkStarFill}
      icon2={BsBookmarkStar}
      color1={theme.icon.color1}
      color2={theme.icon.color2}
      size={size}
      onClick={onClick}
    />
  );
};

export default FavoriteIcon;