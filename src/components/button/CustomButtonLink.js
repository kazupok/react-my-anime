import React from "react";
import { Link } from "react-router-dom";
import "./CustomButton.css";

const CustomButtonLink = ({
  to,
  backgroundColor,
  borderColor,
  textColor,
  children,
  ...props
}) => {
  const styles = {
    backgroundColor: backgroundColor,
    borderColor: borderColor,
    color: textColor,
    textDecoration: "none",
    display: "inline-block",
  };

  return (
    <Link to={to} style={styles} {...props}>
      {children}
    </Link>
  );
};

export default CustomButtonLink;
