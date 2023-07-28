import React from "react";

const CustomLabel = ({
  children,
  fontSize,
  color,
  fontWeight = "bold",
  padding = "0",
  style,
  ...props
}) => {

  const styles = {
    fontSize: fontSize,
    color: color,
    fontWeight: fontWeight,
    padding: padding,
    ...style,
  };

  return (
    <div style={styles} {...props}>
      {children}
    </div>
  );
};

export default CustomLabel;
