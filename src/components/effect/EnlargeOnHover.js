import React, { useState, useContext } from "react";
import { useModal } from "../../context/style/ModalContext";

const EnlargeOnHover = ({ children, scale = 1.2, duration = 0.5 }) => {

  const [isHovered, setIsHovered] = useState(false);
  
  const { modalOpen } = useModal();

  const handleMouseEnter = () => {
    if (!modalOpen) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    setIsHovered(false);
  };

  return (
    <div
      style={{
        position: 'relative',
        transform: isHovered ? `scale(${scale})` : "scale(1)",
        transition: `transform ${duration}s`,
        zIndex: isHovered ? 1 : 0,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick} 
    >
      {children}
    </div>
  );
};

export default EnlargeOnHover;
