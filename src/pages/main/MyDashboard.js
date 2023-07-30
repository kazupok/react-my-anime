import React, { useState, useEffect } from "react";
// useContext
import { useAnimeData } from "context/data/AnimeDataContext";
import { useUserData } from "context/data/UserDataContext";
import { CardCountProvider } from "context/style/CardCountContext";
// utils
import { filterMatchingData } from "utils/index";
// contents
import Dashboard from "pages/main/Dashboard";


const MyDashboard = () => {
  const {
    animeData,
    allAnimeData,
    filterAnimeDataIncluded,
    filterAnimeDataExcluded,
  } = useAnimeData();
  const { userData } = useUserData();

  const [allData, setAllData] = useState([]);
  const [watchedData, setWatchedData] = useState([]);
  const [notWatchedData, setNotWatchedData] = useState([]);
  const [favoriteData, setFavoriteData] = useState([]);
  const [futureWatchedData, setFutureWatchedData] = useState([]);

  useEffect(() => {
    setAllData(allAnimeData());
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
    { label: "全てのアニメ", animeData: allData },
    { label: "見たいアニメ", animeData: futureWatchedData },
    { label: "お気に入りのアニメ", animeData: favoriteData },
    { label: "まだ見てないアニメ", animeData: notWatchedData },
    { label: "もう見たアニメ", animeData: watchedData },
  ];

  return (
    <CardCountProvider>
      <Dashboard dataMap={dataMap} />
    </CardCountProvider>
  );
};

export default MyDashboard;
