import React, { createContext, useContext, useState, useEffect } from "react";
import data from "data/animeData.json";

const AnimeDataContext = createContext();

export const AnimeDataProvider = ({ children }) => {
  const [animeData, setAnimeData] = useState(data);

  // 全てのアニメデータをセットする関数
  const allAnimeData = () => {
    return animeData;
  };

  // 特定のIDリストに含まれているアニメをソートする関数
  const sortAnimeDataIncluded = (idList) => {
    if (!idList) return animeData;
    const sortedAnimeData = idList.map((id) => {
      return animeData.find((anime) => anime.id === id);
    });
    return sortedAnimeData;
  };

  // IDリストに含まれていないアニメをソートする関数
  const sortAnimeDataExcluded = (idList) => {
    if (!idList) return animeData;
    const sortedAnimeData = animeData.filter((anime) => {
      return !idList.includes(anime.id);
    });
    return sortedAnimeData;
  };

  return (
    <AnimeDataContext.Provider
      value={{ animeData, allAnimeData, sortAnimeDataIncluded, sortAnimeDataExcluded }}
    >
      {children}
    </AnimeDataContext.Provider>
  );
};

export const useAnimeData = () => {
  return useContext(AnimeDataContext);
};