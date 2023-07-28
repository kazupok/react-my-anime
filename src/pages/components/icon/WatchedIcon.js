import React from "react";
import { TbEyeCheck, TbEyeX} from "react-icons/tb";
import { useCustomTheme } from "../../../context/style/CustomThemeContext";
import ToggleIcon from "../../../components/icon/ToggleIcon";

const WatchedIcon = ({ toggle, size = "2em", onClick }) => {
  const theme = useCustomTheme().customTheme;

  return (
    <ToggleIcon
      toggle={toggle}
      icon1={TbEyeCheck}
      icon2={TbEyeX}
      color1={theme.icon.color1}
      color2={theme.icon.color2}
      size={size}
      onClick={onClick}
    />
  );
};

export default WatchedIcon;
