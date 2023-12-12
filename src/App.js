import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";
import AuthPage from "./components/auth/AuthPage";
import Home from "./components/home/Home";
import { LINKS } from "./constants/routes";
import PersonalInformation from "./components/profile-settings/PersonalInformation";

function App() {
  const storedToken = localStorage.getItem("token");
  const [isAuth, setIsAuth] = useState(!!storedToken); // Use !! to convert to boolean
  useEffect(() => {
    setIsAuth(!!storedToken);
  }, [storedToken]);
  const redirectLink = isAuth ? LINKS.HOME : LINKS.LOGIN;
  console.log(isAuth);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isAuth ? <Home /> : <Navigate to={redirectLink} />}
        />
        <Route
          path="/home"
          element={isAuth ? <Home /> : <Navigate to={redirectLink} />}
        />
        <Route
          path="/login"
          element={!isAuth ? <AuthPage /> : <Navigate to={redirectLink} />}
        />
        <Route
          path={LINKS.Settings}
          element={
            isAuth ? <PersonalInformation /> : <Navigate to={redirectLink} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
