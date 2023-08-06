// UserDataContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import useAuthAxios from "hooks/useAuthAxios";
import { useAuthContext } from "contexts/AuthContext";

const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const USER_DATA_URL = process.env.REACT_APP_RESTAPI_USER_DATA_URL;

  const authAxios = useAuthAxios();
  const { isRequest } = useAuthContext();

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (isRequest) {
      getUserData();
    }
  }, [isRequest]);

  // ユーザーデータを取得する
  const getUserData = async () => {
    try {
      const response = await authAxios.get(USER_DATA_URL);
      setUserData(response.data[0]);
    } catch (error) {
      console.error(error);
    }
  };

  // ユーザーデータを更新する
  const updateUserData = async (updateData) => {
    try {
      await authAxios.patch(`${USER_DATA_URL}${userData.id}/`, updateData);
      setUserData((prev) => {
        return { ...prev, ...updateData };
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <UserDataContext.Provider value={{ userData, updateUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => {
  return useContext(UserDataContext);
};
