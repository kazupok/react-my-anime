import React, { createContext, useContext, useState, useEffect } from "react";
import data from "data/animeData.json";

const AnimeDataContext = createContext();

export const AnimeDataProvider = ({ children }) => {
  const [animeData, setAnimeData] = useState(data);

  // 全てのアニメデータをセットする関数
  const allAnimeData = () => {
    return animeData;
  };

  // 特定のIDリストに含まれているアニメをfilterする関数
  const filterAnimeDataIncluded = (idList, key="id") => {
    if (!idList) return animeData;
    const filterAnimeData = idList.map((id) => {
      return animeData.find((anime) => anime[key] === id);
    });
    return filterAnimeData;
  };

  // IDリストに含まれていないアニメをfilterする関数
  const filterAnimeDataExcluded = (idList, key="id") => {
    if (!idList) return animeData;
    const filterAnimeData = animeData.filter((anime) => {
      return !idList.includes(anime[key]);
    });
    return filterAnimeData;
  };

  return (
    <AnimeDataContext.Provider
      value={{ animeData, allAnimeData, filterAnimeDataIncluded, filterAnimeDataExcluded }}
    >
      {children}
    </AnimeDataContext.Provider>
  );
};

export const useAnimeData = () => {
  return useContext(AnimeDataContext);
};