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
import DoctorList from './components/doctors/DoctorList';
import AppointmentForm from './components/appointment/AppointmentForm';
import UserAppointments from './components/appointment/UserAppointments'; // Import the new component
import Details from "./components/profile-settings/Details";
import AssistantConsultationList from "./components/assistant/AssistantConsultationList";
import AssistantDashboard from "./components/assistant/AssistantDashboard";
// import AssistantDashboard from "./components/assistant/AssistantDashboard";


function App() {
  const storedToken = localStorage.getItem("token");
  const [isAuth, setIsAuth] = useState(!!storedToken); // Use !! to convert to boolean
  const handleChangeAuthState = (state)=>{
    setIsAuth(state);
  }
  useEffect(() => {
    setIsAuth(!!storedToken);
  }, [storedToken]);
  const redirectLink = isAuth ? LINKS.HOME : LINKS.LOGIN;
  console.log(isAuth);

  return (
    <AssistantDashboard  />
    // <BrowserRouter>
    //   <ToastContainer />

    //   <Routes>
    //     <Route
    //       path="/"
    //       element={isAuth ? <Home /> : <Navigate to={redirectLink} />}
    //     />
    //     <Route
    //       path="/home"
    //       element={isAuth ? <Home /> : <Navigate to={redirectLink} />}
    //     />
    //     <Route
    //       path="/login"
    //       element={!isAuth ? <AuthPage /> : <Navigate to={redirectLink} />}
    //     />
    //     <Route
    //       path={LINKS.Settings}
    //       element={
    //         isAuth ? <PersonalInformation /> : <Navigate to={redirectLink} />
    //       }
    //     />

    //     {
    //       !isAuth  ? <Route path="/" element={<AuthPage setIsAuth={handleChangeAuthState} />} /> : 
    //       <Route path="/" element={<Home setIsAuth={handleChangeAuthState}  />} />
    //     }
    //     <Route path="/medecin" element={<HomeMedecin setIsAuth={handleChangeAuthState}/>} />
    //     <Route path="/details" element={<Details />} />
    //       <Route path="/doctors/:serviceName" element={<DoctorList />} />
    //         <Route path="/appointment/:doctorId" element={<AppointmentForm />} />
    //         <Route path="/appointments" element={<UserAppointments />} />
    //    </Routes>

    // </BrowserRouter>
  );
}

export default App;
