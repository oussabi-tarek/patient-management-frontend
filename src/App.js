import { BrowserRouter,Routes,Route } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import AuthPage from "./components/auth/AuthPage";
import Home from "./components/home/Home";
import HomeMedecin from "./components/home/medecin/HomeMedecin";
import Details from "./components/home/medecin/Details";
import { Modal } from "flowbite";
import Calendar from "./components/home/medecin/Calendar";



function App() {
   const [isAuth,setIsAuth] = useState(false);
   

  return(
    <BrowserRouter>
       <Routes>
        {
          !isAuth  ? <Route path="/" element={<AuthPage setIsAuth={setIsAuth} />} /> : 
          <Route path="/" element={<Home setIsAuth={setIsAuth}  />} />
        }
        <Route path="/medecin" element={<HomeMedecin setIsAuth={setIsAuth}/>} />
        <Route path="/details/:id/:enCours" element={<Details />} />
        <Route path="/date" element={
           <div>
           <Calendar />
         </div>
        } />
       </Routes>
    </BrowserRouter>
  )
}

export default App;
