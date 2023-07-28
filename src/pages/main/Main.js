import React from "react";
import { useCustomTheme } from "../../context/style/CustomThemeContext";
import Dashboard from "./Dashboard";

const Main = (props) => {
  const { selectPage } = props;
  /* Context */
  const theme = useCustomTheme().customTheme;

  const changePage = () => {
    switch (selectPage) {
      case "main":
        return <Dashboard />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div
      style={{
        ...theme.main,
        "overflow-y": "auto",
        height: "calc(100vh - 80px)",
        width: "100%",
      }}
    >
      {changePage()}
    </div>
  );
};

export default Main;
