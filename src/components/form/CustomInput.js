// CustomInput.js
import React from "react";
import { Form } from "react-bootstrap";

import "./CustomInput.css";

const CustomInput = ({
  id,
  placeholder,
  name,
  type,
  value,
  onChange,
  required,
  className,
  backgroundColor,
  borderColor,
  color,
  placeholderColor,
}) => {
  const placeholderClass = placeholderColor ? `placeholder-${id}` : "";
  if (placeholderColor) {
    const style = document.createElement("style");
    style.innerHTML = `
      .${placeholderClass}::placeholder {
        color: ${placeholderColor};
      }
    `;
    document.head.appendChild(style);
  }

  const styles = {
    backgroundColor: backgroundColor,
    borderColor: borderColor,
    color: color,
  };

  return (
    <Form.Group controlId={id} className="custom-input">
      <Form.Control
        style={styles}
        className={`position-relative ${className} ${placeholderClass}`}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </Form.Group>
  );
};

export default CustomInput;
