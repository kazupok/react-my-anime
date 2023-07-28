import React, { useState, useEffect, useRef } from "react";

const SlideToggle = ({ isVisible, children, speed = 100 }) => {
  const [maxHeight, setMaxHeight] = useState(isVisible ? "none" : "0");
  const content = useRef(null);

  useEffect(() => {
    setMaxHeight(isVisible ? `${content.current.scrollHeight}px` : "0");
  }, [isVisible]);

  const style = {
    overflow: "hidden",
    transition: `max-height ${speed}ms ease-in-out`,
    maxHeight,
  };

  return (
    <div style={style} ref={content}>
      {children}
    </div>
  );
};

export default SlideToggle;
