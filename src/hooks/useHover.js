import { useState, useEffect } from 'react';

const useHover = (ref, clickOffMode = false) => {
  const [isHovered, setIsHovered] = useState(false);

  const onHover = () => setIsHovered(true);
  const onUnhover = () => setIsHovered(false);
  const onClick = () => clickOffMode && setIsHovered(false);

  useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener("mouseenter", onHover);
      node.addEventListener("mouseleave", onUnhover);
      if (clickOffMode) {
        node.addEventListener("click", onClick);
      }

      // cleanup function
      return () => {
        node.removeEventListener("mouseenter", onHover);
        node.removeEventListener("mouseleave", onUnhover);
        if (clickOffMode) {
          node.removeEventListener("click", onClick);
        }
      };
    }
  }, [ref, clickOffMode]); // re-run effect if ref or clickOffMode changes

  return isHovered;
};

export default useHover;
