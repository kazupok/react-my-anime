import React from "react";
import { FaStar as FullStar } from "react-icons/fa";

const ButtonIcon = ({
  size = "m",
  icon: Icon = FullStar,
  color = "white",
  onClick = () => {},
}) => {
  const fontSizeMap = {
    s: "0.8rem",
    m: "1rem",
    l: "1.5rem",
    ll:"2rem",
    xl:"3rem",
  };
  const iconStyles = {
    display: "inline-block",
    fontSize: fontSizeMap[size],
    cursor: "pointer",
  };

  return (
    <div style={iconStyles} onClick={onClick}>
      <Icon color={color} />
    </div>
  );
};

export default ButtonIcon;
