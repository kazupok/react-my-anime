import React, { createContext, useContext, useState, useEffect } from "react";
import useAuthAxios from "hooks/useAuthAxios";
import { useAuthContext } from "contexts/AuthContext";


const AnimeDataContext = createContext();

export const AnimeDataProvider = ({ children }) => {
  const ANIME_DATA_URL = process.env.REACT_APP_RESTAPI_ANIME_DATA_URL;

  const authAxios = useAuthAxios();
  const { isRequest } = useAuthContext();

  const [animeData, setAnimeData] = useState([]);


  useEffect(() => {
    if (isRequest) {
      getAnimeData();
    }
  }, [isRequest]);

  // 全てのアニメデータを取得する
  const getAnimeData = async () => {
    try {
      const response = await authAxios.get(ANIME_DATA_URL);
      setAnimeData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // 特定のIDリストに含まれているアニメをfilterする関数
  const filterAnimeDataIncluded = (idList, key = "id") => {
    if (!idList) return animeData;
    const filterAnimeData = idList.map((id) => {
      return animeData.find((anime) => anime[key] === id);
    });
    return filterAnimeData;
  };

  // IDリストに含まれていないアニメをfilterする関数
  const filterAnimeDataExcluded = (idList, key = "id") => {
    if (!idList) return animeData;
    const filterAnimeData = animeData.filter((anime) => {
      return !idList.includes(anime[key]);
    });
    return filterAnimeData;
  };

  return (
    <AnimeDataContext.Provider
      value={{
        animeData,
        filterAnimeDataIncluded,
        filterAnimeDataExcluded,
      }}
    >
      {children}
    </AnimeDataContext.Provider>
  );
};

export const useAnimeData = () => {
  return useContext(AnimeDataContext);
};
