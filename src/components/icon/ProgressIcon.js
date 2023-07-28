import React from "react";
import { FaStar as FullStar } from "react-icons/fa";

const ProgressIcon = ({
  fillPercentage,
  size="m",
  icon: Icon = FullStar,
  filledColor = "white",
  emptyColor = "gray",
  onClick = () => {}
}) => {
  const fontSizeMap = {
    s: "0.8rem",
    m: "1rem",
    l: "1.2rem",
  };
  const iconStyles = {
    position: "relative",
    display: "inline-block",
    fontSize: fontSizeMap[size],
    cursor: 'pointer',
  };

  const emptyIconStyles = {
    position: "relative",
  };

  const fillIconStyles = {
    position: "absolute",
    top: 0,
    left: 0,
    whiteSpace: "nowrap",
    overflow: "hidden",
    width: `${fillPercentage * 100}%`,
  };

  return (
    <div style={iconStyles} onClick={onClick}>
      <div style={emptyIconStyles}>
        <Icon color={emptyColor} />
      </div>
      <div style={fillIconStyles}>
        <Icon color={filledColor} />
      </div>
    </div>
  );
};

export default ProgressIcon;
