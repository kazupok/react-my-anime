// AuthContext.js

import React, { createContext, useState, useContext } from "react";
import axios from "api/axios";
import { useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const JWT_CREATE_URL = process.env.REACT_APP_RESTAPI_JWT_CREATE_URL;
  const JWT_REFRESH_URL = process.env.REACT_APP_RESTAPI_JWT_REFRESH_URL;
  const USER_URL = process.env.REACT_APP_RESTAPI_USER_URL;

  const [auth, setAuth] = useState({accessToken: null});
  const [isRequest, setIsRequest] = useState(false);

  const signIn = async (username, email, password) => {
    try {
      const response = await axios.post(USER_URL, {
        username: username,
        email: email,
        password: password,
      });

      if (response.status === 201) {
        await login(username, password);
      } else {
        throw new Error("User creation failed");
      }
    } catch (error) {
      alert("登録に失敗しました。");
    }
  };

  const login = async (username, password) => {
    try {
      const response = await axios.post(JWT_CREATE_URL, {
        username: username,
        password: password,
      });
      if (response.status === 200) {
        // Save refresh token to cookie
        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + 1440); // Set expiry to 1440 minutes (24 hours) from now
        document.cookie = `refreshToken=${
          response.data.refresh
        }; expires=${expires.toUTCString()}; path=/;`;
        // Save token to local storage
        setAuth({
          accessToken: response.data.access,
        });
      } else {
        throw new Error("Authentication failed");
      }
    } catch (error) {
      alert("メールアドレスまたはパスワードが間違っています");
    }
  };

  const logout = () => {
    try {
      // Remove token from local storage
      setAuth({
        accessToken: null,
      });
      setIsRequest(false);
      // Remove refresh token from cookie
      document.cookie =
        "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    } catch (error) {
      alert("ログアウトに失敗しました");
    }
  };

  const refreshToken = () => {
    const refresh = async () => {
      try {
        // cookieに保存されたrefresh_tokenを送付してaccess_tokenを取得する
        const response = await axios.get(JWT_REFRESH_URL, {
          withCredentials: true,
        });

        setAuth((prev) => {
          // access_tokenを保持する
          return { ...prev, accessToken: response.data.accessToken };
        });

        return response.data.accessToken;
      } catch (error) {
        logout();
        console.error("Failed to refresh token: ", error);
      }
    };

    return refresh;
  };

  useEffect(() => {
    setIsRequest(true);
  }, [auth]);

  return (
    <AuthContext.Provider
      value={{ auth, isRequest, signIn, login, logout, refreshToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
