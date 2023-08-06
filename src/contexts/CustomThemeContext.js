// ThemeContext.js

import { createContext, useContext, useState, useEffect } from "react";

// darkThemeを定義
const darkTheme = {
  main: {
    backgroundColor:"black",
    color:"white"
  },
  header: {
    backgroundColor:"#101424",
    color:"white"
  },
  card: {
    backgroundColor:"#3E3E3E",
    color:"white"
  },
  icons: {
    home: "/images/icons/icon-home-white.png"
  },
  label: {
    color:"white"
  },
  labelDescription: {
    color:"#e0e0e0"
  },
  labelComment: {
    color:"white"
  },
  icon:{
    color:"white"
  },
  icon1:{
    color:"gray"
  },
  icon2:{
    color:"#ffff7a"
  },
  icon3:{
    color:"#ff7a7a"
  },
  accentColor1: {
    backgroundColor:"#30343c"
  },
  accentColor2: {
    backgroundColor:"#000000"
  }
};

const lightTheme = {
  icons: {
    home: "/images/icons/icon-home-black.png"
  },
};

const CustomThemeContext = createContext();

export const useCustomTheme = () => {
  return useContext(CustomThemeContext);
};

export const CustomThemeProvider = ({ children }) => {
  const [customTheme, setCustomTheme] = useState(darkTheme);

  const toggleCustomTheme = () => {
    setCustomTheme((prevTheme) =>
      prevTheme === darkTheme ? lightTheme : darkTheme
    );
  };

  const getCustomInputClassName = () => {
    if (customTheme === darkTheme) {
      return "custom-input-dark";
    } else if (customTheme === lightTheme) {
      return "custom-input-light";
    }
  };

  const value = {
    customTheme,
    getCustomInputClassName,
    toggleCustomTheme,
  };

  return (
    <CustomThemeContext.Provider value={value}>
      {children}
    </CustomThemeContext.Provider>
  );
};
