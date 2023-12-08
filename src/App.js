import { BrowserRouter,Routes,Route } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import AuthPage from "./components/auth/AuthPage";
import Home from "./components/home/Home";

function App() {
   const [isAuth,setIsAuth] = useState(false);
  return(
    <BrowserRouter>
       <Routes>
        {
          !isAuth  ? <Route path="/" element={<AuthPage setIsAuth={setIsAuth} />} /> : 
          <Route path="/" element={<Home setIsAuth={setIsAuth}  />} />
        }
       </Routes>
    </BrowserRouter>
  )
}

export default App;
