/* MyPage */
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
// useContext
import { useAuthContext } from "contexts/AuthContext";
/* Widgets */
import Header from "./widgets/Header";
import Main from "./Main";
/* Pages */

const MyPage = () => {
  const { auth } = useAuthContext();
  const [selectPage, setSelectPage] = useState("main");

  const handleSelectPage = (eventKey) => {
    setSelectPage(eventKey);
  };

  return (
    <>
      {auth?.accessToken ? (
        <>
          {/*Headerコンポーネント */}
          <Header />
          {/*メインコンテンツ */}
          <Main selectPage={selectPage} />
        </>
      ) : (
        <Navigate to={`/login/`} />
      )}
    </>
  );
};

export default MyPage;
