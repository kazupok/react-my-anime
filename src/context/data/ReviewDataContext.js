import React, { createContext, useContext, useState, useEffect } from "react";
import { useFirebaseReviewData } from "../../data/useFirebaseReviewData";
import { paths } from "../../auth/firebaseConfig";

const ReviewDataContext = createContext();

export const ReviewDataProvider = ({ children }) => {
  const [reviewData, setReviewData] = useState([]);
  const { getReviewData, updateReviewData, deleteReviewData } = useFirebaseReviewData(
    paths.customerReviews,
    setReviewData
  );

  useEffect(() => {
    const fetchReviewData = async () => {
      const ReviewData = await getReviewData();
      setReviewData(ReviewData);
    };

    fetchReviewData();
  }, []);

  return (
    <ReviewDataContext.Provider value={{ reviewData, updateReviewData , deleteReviewData}}>
      {children}
    </ReviewDataContext.Provider>
  );
};

export const useReviewData = () => {
  return useContext(ReviewDataContext);
};
