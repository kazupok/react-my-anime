import React, { createContext, useContext, useState, useEffect } from "react";
import useBreakpoint from "context/auth/useBreakpoint";

const CardCountContext = createContext(4);

export const useCardCount = () => {
  const context = useContext(CardCountContext);
  if (context === undefined) {
    throw new Error("useCardCount must be used within a CardCountProvider");
  }
  return context;
};

export const CardCountProvider = ({ children }) => {
  const breakpoint = useBreakpoint();
  const [cardCount, setCardCount] = useState(4);

  useEffect(() => {
    switch (breakpoint) {
      case "xs":
        setCardCount(1);
        break;
      case "m":
        setCardCount(2);
        break;
      case "xl":
        setCardCount(3);
        break;
      case "lll":
        setCardCount(4);
        break;
      default:
        setCardCount(4);
    }
  }, [breakpoint]);

  return (
    <CardCountContext.Provider value={cardCount}>
      {children}
    </CardCountContext.Provider>
  );
};
