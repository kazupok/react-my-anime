import React from "react";
import { useCustomTheme } from "../../context/style/CustomThemeContext";
import MyDashboard from "pages/main/MyDashboard";

const Main = (props) => {
  const { selectPage } = props;
  /* Context */
  const theme = useCustomTheme().customTheme;

  const changePage = () => {
    switch (selectPage) {
      case "main":
        return <MyDashboard />;
      default:
        return <MyDashboard />;
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
