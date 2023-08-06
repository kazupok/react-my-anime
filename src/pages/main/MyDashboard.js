import React, { useState, useEffect } from "react";
// useContext
import { useAnimeData } from "contexts/data/AnimeDataContext";
import { useUserData } from "contexts/data/UserDataContext";
import { CardCountProvider } from "contexts/CardCountContext";
// utils
import { filterMatchingData } from "utils/index";
// contents
import Dashboard from "pages/main/Dashboard";

const MyDashboard = () => {
  const {
    animeData,
    filterAnimeDataIncluded,
    filterAnimeDataExcluded,
  } = useAnimeData();
  const { userData } = useUserData();

  const [watchedData, setWatchedData] = useState([]);
  const [notWatchedData, setNotWatchedData] = useState([]);
  const [favoriteData, setFavoriteData] = useState([]);
  const [futureWatchedData, setFutureWatchedData] = useState([]);

  useEffect(() => {
    setWatchedData(filterAnimeDataIncluded(userData.watched));
    setNotWatchedData(filterAnimeDataExcluded(userData.watched));
    setFavoriteData(filterAnimeDataIncluded(userData.favorites));
  }, [animeData, userData]);

  useEffect(() => {
    setFutureWatchedData(
      filterMatchingData(notWatchedData, favoriteData, "id")
    );
  }, [notWatchedData, favoriteData]);

  const dataMap = [
    { label: "全てのアニメ", animeData: animeData },
    { label: "見たいアニメ", animeData: futureWatchedData },
    { label: "お気に入りのアニメ", animeData: favoriteData },
    { label: "まだ見てないアニメ", animeData: notWatchedData },
    { label: "もう見たアニメ", animeData: watchedData },
  ];

  return (
    <CardCountProvider>
      {dataMap[0].animeData.length && <Dashboard dataMap={dataMap} />}
    </CardCountProvider>
  );
};

export default MyDashboard;
