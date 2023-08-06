import React from "react";
import { TbEyeCheck, TbEyeX} from "react-icons/tb";
import { useCustomTheme } from "../../../contexts/CustomThemeContext";
import ToggleIcon from "../../../components/icon/ToggleIcon";

const WatchedIcon = ({ toggle, size = "2em", onClick }) => {
  const theme = useCustomTheme().customTheme;

  return (
    <ToggleIcon
      toggle={toggle}
      icon1={TbEyeCheck}
      icon2={TbEyeX}
      color1={theme.icon.color}
      color2={theme.icon1.color}
      size={size}
      onClick={onClick}
    />
  );
};

export default WatchedIcon;
