/* MyPage */
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
/* Contexts */
import { useUser } from "../../context/auth/UserContext";

/* Widgets */
import Header from "./widgets/Header";
import Main from "./Main";
/* Pages */

const MyPage = () => {
  const { user, loading } = useUser();
  const [selectPage, setSelectPage] = useState("main");

  const handleSelectPage = (eventKey) => {
    setSelectPage(eventKey);
  };

  return (
    <>
      {!loading && (
        <>
          {!user ? (
            <Navigate to={`/login/`} />
          ) : (
            <>
              {/*Headerコンポーネント */}
              <Header/>
              {/*メインコンテンツ */}
              <Main selectPage={selectPage} />
            </>
          )}
        </>
      )}
    </>
  );
};

export default MyPage;
