import React from "react";
import { Button } from "react-bootstrap";
import "./CustomButton.css";

const CustomButtonSubmit = ({
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
  };

  return (
    <Button style={styles} type="submit" {...props}>
      {children}
    </Button>
  );
};

export default CustomButtonSubmit;
