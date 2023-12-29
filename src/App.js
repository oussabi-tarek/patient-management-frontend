
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";
import AuthPage from "./components/auth/AuthPage";
import Home from "./components/home/Home";
import { LINKS } from "./constants/routes";
import PersonalInformation from "./components/profile-settings/PersonalInformation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeMedecin from "./components/home/medecin/HomeMedecin";
import Details from "./components/home/medecin/Details";
import Calendar from "./components/home/medecin/Calendar";
import DoctorList from './components/doctors/DoctorList';
import AppointmentForm from './components/appointment/AppointmentForm';
import UserAppointments from './components/appointment/UserAppointments'; // Import the new component
import RegisterForm from "./components/registration/RegisterForm";
import ChatsPage from "./components/chat/ChatsPage";
import axios from "axios";


function App() {
  // const [isAuth,setIsAuth] = useState(false);
   const [isMedecin,setIsMedecin] = useState(false);
  
   
   
  const storedToken = localStorage.getItem("token");
  const [isAuth, setIsAuth] = useState(false); 
  
  useEffect(() => {
    setIsAuth(!!storedToken);
  }, [storedToken]);
  const redirectLink = isAuth ? LINKS.HOME : LINKS.LOGIN;

  return (
    <BrowserRouter>
      <ToastContainer />

      <Routes>

         <Route path="/register" element={<RegisterForm/>} />
        
        {/* <Route
          path="/home"
          element={isAuth ? <Home /> : <Navigate to={redirectLink} />}
        /> */}
        <Route
          path={LINKS.Settings}
          element={
            isAuth ? <PersonalInformation /> : <Navigate to={redirectLink} />
          }
        />

        {
          !isMedecin && (
          !isAuth  ? <Route path="/" element={<AuthPage setIsAuth={setIsAuth} />} /> : 
          <Route path="/" element={<Home setIsAuth={setIsAuth} />} />
          )
        }
        <Route path="/medecin" element={<HomeMedecin setIsAuth={setIsAuth}/>} />
        <Route path="/details/:id/:idRendezVous/:enCours" element={<Details />} />
        <Route path="/date" element={
           <div>
           <Calendar />
         </div>
        } />
        <Route path="/chat" element={<ChatsPage />}  />
        <Route path="/details" element={<Details />} />
          <Route path="/doctors/:serviceName" element={<DoctorList setIsAuth={setIsAuth}/>} />
            <Route path="/appointment/:doctorId" element={<AppointmentForm setIsAuth={setIsAuth} />} />
            <Route path="/appointments" element={<UserAppointments  setIsAuth={setIsAuth} />} />
       </Routes>

    // </BrowserRouter>
  );
}

export default App;
