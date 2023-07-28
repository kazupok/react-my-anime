// UserDataContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { useFirebaseUserData } from "../../data/useFirebaseUserData";
import { paths } from "../../auth/firebaseConfig";
import { useUser } from "../auth/UserContext";

const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const { user } = useUser();

  const [userData, setData] = useState([]);
  const { getUserData, updateUserData } = useFirebaseUserData(paths.userData, setData);
  
  useEffect(() => {
  const fetchUserData = async () => {
    if (user?.uid) {
      const userData = await getUserData(user.uid);
      setData(userData);
    }
  };

  fetchUserData();
}, [user]);
  

  return (
    <UserDataContext.Provider value={{ userData, updateUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => {
  return useContext(UserDataContext);
};
