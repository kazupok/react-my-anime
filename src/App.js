/* App.js */
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
/* Provider */
import { CustomThemeProvider } from "contexts/CustomThemeContext";
import { ModalContextProvider } from "contexts/ModalContext";
import { TestContextProvider } from "contexts/TestContext";
import { UserDataProvider } from "contexts/data/UserDataContext";
import { ReviewDataProvider } from "contexts/data/ReviewDataContext";
import { AnimeDataProvider } from "contexts/data/AnimeDataContext";
/* Pages */
import LoginPage from "./pages/login/LoginPage";
import MyPage from "./pages/main/MyPage";
import RegisterPage from "./pages/login/RegisterPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Sign Up コンポーネント */}
        <Route path={`/register/`} element={<RegisterPage />} />
        {/* Login コンポーネント */}
        <Route path={`/login/`} element={<LoginPage />} />
        <Route
          path={`/`}
          element={
            <UserDataProvider>
              <AnimeDataProvider>
                <ReviewDataProvider>
                  <TestContextProvider>
                    <CustomThemeProvider>
                      <ModalContextProvider>
                        {/* MyPage コンポーネント */}
                        <MyPage />
                      </ModalContextProvider>
                    </CustomThemeProvider>
                  </TestContextProvider>
                </ReviewDataProvider>
              </AnimeDataProvider>
            </UserDataProvider>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
