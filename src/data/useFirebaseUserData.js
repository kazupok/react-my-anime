import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../auth/firebaseConfig";

export const useFirebaseUserData = (initialPath, setData) => {
  // データを取得
  const getUserData = async (userId) => {
    const documentRef = doc(db, initialPath);
    const documentSnap = await getDoc(documentRef);

    if (documentSnap.exists()) {
      const allUsers = documentSnap.data().users;
      const user = allUsers.find((user) => user.id === userId);

      if (user) {
        return user;
      } else {
        // ユーザーデータが存在しない場合、新しいユーザーデータを追加します
        const newUser = { id: userId, watched: [], favorites: [] }; // 新しいユーザーデータの形式は適宜変更してください
        allUsers.push(newUser);

        await updateDoc(documentRef, { users: allUsers });
        return newUser;
      }
    } else {
      // ドキュメントが存在しない場合、コンソールにメッセージを出力します
      return null;
    }
  };

  // データを更新
  const updateUserData = async (userId, updatedData) => {
    const docRef = doc(db, initialPath);

    try {
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        const users = docSnapshot.data().users;
        const otherUsersData = users.filter((user) => user.id !== userId);
        const addUsers = [...otherUsersData, updatedData];
        await updateDoc(docRef, { users: addUsers });
        setData(updatedData);
      } else {
        return Promise.reject("Document does not exist.");
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return { getUserData, updateUserData };
};
