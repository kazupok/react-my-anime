import React, { createContext, useContext, useState, useEffect } from "react";
import { useFirebaseReviewData } from "../../data/useFirebaseReviewData";
import { paths } from "../../auth/firebaseConfig";

const ReviewDataContext = createContext();

export const ReviewDataProvider = ({ children }) => {
  const [reviewData, setReviewData] = useState([]);
  const { getReviewData, updateReviewData, deleteReviewData } =
    useFirebaseReviewData(paths.customerReviews, setReviewData);

  useEffect(() => {
    const fetchReviewData = async () => {
      const ReviewData = await getReviewData();
      setReviewData(ReviewData);
    };

    fetchReviewData();
  }, []);

  // 特定のIDリストに含まれているアニメをfilterする関数
  const filterReviewDataIncluded = (idList, key = "userId") => {
    if (!idList) return reviewData;
    const filterReviewData = idList.map((id) => {
      return reviewData.find((review) => review[key] === id);
    });
    return filterReviewData;
  };

  // IDリストに含まれていないアニメをfilterする関数
  const filterReviewDataExcluded = (idList, key = "userId") => {
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
