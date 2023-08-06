//useAuthAxios.js

import { authAxios } from "api/axios";
import { useEffect } from "react";
import { useAuthContext } from "contexts/AuthContext";

const useAuthAxios = () => {
  const AUTH_HEADER_TYPES = process.env.REACT_APP_RESTAPI_AUTH_HEADER_TYPES;
  const { auth, logout, refreshToken } = useAuthContext();

  useEffect(() => {
    // リクエスト前に実行。headerに認証情報を付与する
    const requestIntercept = authAxios.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `${AUTH_HEADER_TYPES} ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // レスポンスを受け取った直後に実行。もし認証エラーだった場合、再度リクエストする。
    const responseIntercept = authAxios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        // 403認証エラー(headerにaccess_tokenがない。もしくはaccess_tokenが無効)
        if (error?.response?.status === 403 && !prevRequest.sent) {
          prevRequest.sent = true;
          try {
            // 新しくaccess_tokenを発行する
            const newAccessToken = await refreshToken();
            prevRequest.headers["Authorization"] = `${AUTH_HEADER_TYPES} ${newAccessToken}`;
            // 再度実行する
            return authAxios(prevRequest);
          } catch (refreshError) {
            console.error('Failed to refresh token: ', refreshError);
            // エラーの場合、ログアウト関数を実行する
            logout();
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      // 離脱するときにejectする
      authAxios.interceptors.request.eject(requestIntercept);
      authAxios.interceptors.response.eject(responseIntercept);
    };
  }, [auth]);

  return authAxios;
};

export default useAuthAxios;