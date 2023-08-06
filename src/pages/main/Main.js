import React from "react";
// useContext
import { useCustomTheme } from "contexts/CustomThemeContext";
import { useUserData } from "contexts/data/UserDataContext";
import { useAnimeData } from "contexts/data/AnimeDataContext";
import { useReviewData } from "contexts/data/ReviewDataContext";

import MyDashboard from "pages/main/MyDashboard";

const Main = (props) => {
  const { selectPage } = props;
  const { userData } = useUserData();
  const { animeData } = useAnimeData();
  const { reviewData } = useReviewData();
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
      {userData?.id && animeData.length && reviewData.length ? (
        <>{changePage()}</>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Main;
