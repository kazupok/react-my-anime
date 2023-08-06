import React, { createContext, useState, useContext } from 'react';

// テスト用のコンテキストを作成します。
const TestContext = createContext();

// テスト用のプロバイダーコンポーネントを作成します。
export const TestContextProvider = ({ children }) => {
  const [toggle, setToggle] = useState(0);

  // toggleの値を切り替える関数を作成します。
  const toggleValue = () => {
    setToggle((prevToggle) => (prevToggle === 0 ? 1 : 0));
  };

  return (
    <TestContext.Provider value={{ toggle, toggleValue }}>
      {children}
    </TestContext.Provider>
  );
};

// テスト用のフックを作成します。
export const useTest = () => useContext(TestContext);
