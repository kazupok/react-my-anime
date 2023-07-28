// CustomTextArea.js
import React from "react";
import { Form } from "react-bootstrap";

import "./CustomTextArea.css";

const CustomTextArea = ({
  id,
  placeholder,
  name,
  value,
  onChange,
  required,
  className,
  backgroundColor,
  borderColor,
  color,
  placeholderColor,
  rows = 5,
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
    <Form.Group controlId={id} className="custom-textarea">
      <Form.Control
        as="textarea"
        rows={rows}
        style={styles}
        className={`position-relative ${className} ${placeholderClass}`}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </Form.Group>
  );
};

export default CustomTextArea;
