import React, { createContext, useContext, useState, useEffect } from "react";
import useAuthAxios from "hooks/useAuthAxios";
import { useAuthContext } from "contexts/AuthContext";


const ReviewDataContext = createContext();

export const ReviewDataProvider = ({ children }) => {
  const REVIEW_DATA_URL = process.env.REACT_APP_RESTAPI_REVIEW_DATA_URL;

  const authAxios = useAuthAxios();
  const { isRequest } = useAuthContext();
  
  const [reviewData, setReviewData] = useState([]);


  useEffect(() => {
    if (isRequest) {
      getReviewData();
    }
  }, [isRequest]);


  // 全てのレビューデータを取得する
  const getReviewData = async () => {
    try {
      const response = await authAxios.get(REVIEW_DATA_URL);
      setReviewData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // レビューデータを追加する
  const addReviewData = async (addData) => {
    try {
      await authAxios.post(`${REVIEW_DATA_URL}`, addData);
      getReviewData();
    } catch (error) {
      console.error(error);
    }
  };

  // レビューデータを更新する
  const updateReviewData = async (id, updateData) => {
    try {
      await authAxios.patch(`${REVIEW_DATA_URL}${id}/`, updateData);
      getReviewData();
    } catch (error) {
      console.error(error);
    }
  };

  // レビューデータを削除する
  const deleteReviewData = async (id) => {
    try {
      await authAxios.delete(`${REVIEW_DATA_URL}${id}/`);
      getReviewData();
    } catch (error) {
      console.error(error);
    }
  };

  // 特定のIDリストに含まれているアニメをfilterする関数
  const filterReviewDataIncluded = (idList, key = "user") => {
    if (!idList) return reviewData;
    const filterReviewData = idList.map((id) => {
      return reviewData.find((review) => review[key] === id);
    });
    return filterReviewData;
  };

  // IDリストに含まれていないアニメをfilterする関数
  const filterReviewDataExcluded = (idList, key = "user") => {
    if (!idList) return reviewData;
    const filterReviewData = reviewData.filter((review) => {
      return !idList.includes(review[key]);
    });
    return filterReviewData;
  };

  return (
    <ReviewDataContext.Provider
      value={{
        reviewData,
        addReviewData,
        updateReviewData,
        deleteReviewData,
        filterReviewDataIncluded,
        filterReviewDataExcluded,
      }}
    >
      {children}
    </ReviewDataContext.Provider>
  );
};

export const useReviewData = () => {
  return useContext(ReviewDataContext);
};
