import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../auth/firebaseConfig";

export const useFirebaseReviewData = (initialPath, setReviewData) => {
  // データを取得
  const getReviewData = async () => {
    const documentRef = doc(db, initialPath);
    const documentSnap = await getDoc(documentRef);

    if (documentSnap.exists()) {
      const data = documentSnap.data().reviews;

      if (data) {
        return data;
      } else {
        // ドキュメントが存在しない場合、コンソールにメッセージを出力します
        return null;
      }
    }
  };

  // データを更新
  const updateReviewData = async (updatedData) => {
    const docRef = doc(db, initialPath);

    try {
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        const reviews = docSnapshot.data().reviews;
        const otherReviews = reviews.filter((review) => review.id !== updatedData.id);
        const updatedReviews = [...otherReviews, updatedData];
        await updateDoc(docRef, { reviews: updatedReviews });
        setReviewData(updatedReviews);
      } else {
        return Promise.reject("Document does not exist.");
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

  // データを削除
  const deleteReviewData = async (deleteId) => {
    const docRef = doc(db, initialPath);

    try {
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        const reviews = docSnapshot.data().reviews;
        const deleteReviews = reviews.filter((review) => review.id !== deleteId);
        await updateDoc(docRef, { reviews: deleteReviews });
        setReviewData(deleteReviews);
      } else {
        return Promise.reject("Document does not exist.");
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return { getReviewData, updateReviewData, deleteReviewData};
};
