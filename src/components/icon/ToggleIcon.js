import React from "react";
import { IconContext } from "react-icons";
import './ToggleIcon.css';

const ToggleIcon = ({
  toggle,
  icon1,
  icon2,
  color1 = "white",
  color2 = "gray",
  size = "2em",
  onClick
}) => {
  // toggleの値に基づいてiconとcolorを選択
  const icon = toggle ? icon1 : icon2;
  const color = toggle ? color1 : color2;

  return (
    <IconContext.Provider value={{ color: color, size: size }}>
      <div className="icon" onClick={onClick}>{React.createElement(icon)}</div>
    </IconContext.Provider>
  );
};

export default ToggleIcon;
