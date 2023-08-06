import React, { useState, useEffect, useRef } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useModal } from "contexts/ModalContext";
// hooks
import { useHover } from "hooks/index";

import "./CustomCarousel.css";

const CustomCarousel = ({ children, displayCount, padding = "0" }) => {
  const { modalOpen } = useModal();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationName, setAnimationName] = useState("fadeRight");

  const hoverRefLeft = useRef();
  const hoverRefRight = useRef();
  const isHoveredLeft = useHover(hoverRefLeft);
  const isHoveredRight = useHover(hoverRefRight);

  const handlePrev = () => {
    if (currentIndex > 0 && !isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((oldIndex) => Math.max(0, oldIndex - displayCount));
    }
  };

  const handleNext = () => {
    if (currentIndex + displayCount < children.length && !isAnimating) {
      setIsAnimating(true);
      const remainingSlides = children.length - (currentIndex + displayCount);
      setCurrentIndex((oldIndex) =>
        Math.min(
          children.length - Math.min(remainingSlides, 4),
          oldIndex + displayCount
        )
      );
    }
  };

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 300); // 300ms is the duration of the animation
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  useEffect(() => {
    if (isHoveredLeft && !modalOpen) {
      setAnimationName("fadeLeft");
    }
  }, [isHoveredLeft]);

  useEffect(() => {
    if (isHoveredRight && !modalOpen) {
      setAnimationName("fadeRight");
    }
  }, [isHoveredRight]);

  const containerStyle = {
    display: "flex",
    overflow: "hidden",
    padding: padding,
    paddingLeft: "30px",
    paddingRight: "30px",
    position: "relative",
    height: "100%",
  };

  const childrenContainerStyle = {
    position: "absolute",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
  };

  const commonOverlayButtonStyle = {
    position: "absolute",
    top: 0,
    height: "100%",
    border: "none",
    zIndex: 6,
    cursor: "pointer",
    pointerEvents: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const overlayButtonStyleLeft = {
    ...commonOverlayButtonStyle,
    left: 0,
    width: "40px",
    background: "linear-gradient(to right, rgba(0,0,0,0.9), transparent)",
  };

  const overlayButtonStyleRight = {
    ...commonOverlayButtonStyle,
    right: 0,
    width: "40px",
    background: "linear-gradient(to left, rgba(0,0,0,0.9), transparent)",
  };

  const hoverDetectorStyle = {
    position: "absolute",
    top: 0,
    height: "100%",
    width: "40px",
    zIndex: 7,
    pointerEvents: "auto",
  };

  return (
    <div style={containerStyle}>
      <div ref={hoverRefLeft} style={{ ...hoverDetectorStyle, left: 0 }}>
        {isHoveredLeft && !modalOpen && currentIndex > 0 && (
          <div onClick={handlePrev} style={overlayButtonStyleLeft}>
            <MdArrowBackIos color="white" />
          </div>
        )}
      </div>
      <TransitionGroup>
        <CSSTransition
          key={currentIndex}
          timeout={500}
          classNames={animationName}
        >
          <div style={childrenContainerStyle}>
            {children.slice(currentIndex, currentIndex + displayCount)}
          </div>
        </CSSTransition>
      </TransitionGroup>
      <div ref={hoverRefRight} style={{ ...hoverDetectorStyle, right: 0 }}>
        {isHoveredRight && !modalOpen && currentIndex + displayCount < children.length && (
          <div onClick={handleNext} style={overlayButtonStyleRight}>
            <MdArrowForwardIos color="white" />
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomCarousel;
