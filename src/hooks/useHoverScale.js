import {useEffect, useState} from "react";
import { useModal } from "context/style/ModalContext";

const useHoverScale = (isScaleUp, scale, duration, zindex) => {
  const { modalOpen } = useModal();
  const [styles, setStyles] = useState({});

  useEffect(() => {
    const style = {
      transform: isScaleUp&&!modalOpen ? `scale(${scale})` : "scale(1)",
      transition: `transform ${duration}s`,
      zIndex: isScaleUp&&!modalOpen ? zindex : 0,
    };
    setStyles(style);
  }, [isScaleUp]);

  return styles;
};

export default useHoverScale;
