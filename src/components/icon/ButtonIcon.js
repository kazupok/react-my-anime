import React from "react";
import { FaStar as FullStar } from "react-icons/fa";

const ButtonIcon = ({
  size = "m",
  icon: Icon = FullStar,
  color = "white",
  onClick = () => {},
  style,
  className="bt-trans bt-trans-s",
}) => {
  const fontSizeMap = {
    s: "0.8rem",
    m: "1rem",
    l: "1.5rem",
    ll:"2rem",
    xl:"3rem",
  };
  const iconStyles = {
    ...style,
    display: "inline-block",
    fontSize: fontSizeMap[size],
    cursor: "pointer",
    width:"fit-content"
  };

  return (
    <div style={iconStyles} onClick={onClick} className={className}>
      <Icon color={color} />
    </div>
  );
};

export default ButtonIcon;
