/* App.js */
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
/* Provider */
import { AuthProvider } from "./auth/AuthContext";
import { UserProvider } from "./context/auth/UserContext";
import { CustomThemeProvider } from "./context/style/CustomThemeContext";
import { ModalContextProvider } from "./context/style/ModalContext";
import { TestContextProvider } from "./context/test/TestContext";
import { UserDataProvider } from "./context/data/UserDataContext";
import { ReviewDataProvider } from "./context/data/ReviewDataContext";
import { AnimeDataProvider } from "./context/data/AnimeDataContext";
/* Pages */
import LoginPage from "./pages/login/LoginPage";
import MyPage from "./pages/main/MyPage";
import RegisterPage from "./pages/login/RegisterPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Sign Up コンポーネント */}
          <Route path={`/register/`} element={<RegisterPage />} />
          {/* Login コンポーネント */}
          <Route path={`/login/`} element={<LoginPage />} />
          <Route
            path={`/`}
            element={
              <UserProvider>
                <TestContextProvider>
                  <CustomThemeProvider>
                    <AnimeDataProvider>
                      <UserDataProvider>
                        <ReviewDataProvider>
                          <ModalContextProvider>
                            {/* MyPage コンポーネント */}
                            <MyPage />
                          </ModalContextProvider>
                        </ReviewDataProvider>
                      </UserDataProvider>
                    </AnimeDataProvider>
                  </CustomThemeProvider>
                </TestContextProvider>
              </UserProvider>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
