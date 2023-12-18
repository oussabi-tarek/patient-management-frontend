// App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { useState } from 'react';
import AuthPage from './components/auth/AuthPage';
import Home from './components/home/Home';
import DoctorList from './components/doctors/DoctorList';
import AppointmentForm from './components/appointment/AppointmentForm';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        {!isAuth ? (
          <Route path="/" element={<AuthPage setIsAuth={setIsAuth} />} />
        ) : (
          <>
            <Route path="/" element={<Home setIsAuth={setIsAuth} />} />
            <Route path="/doctors/:serviceName" element={<DoctorList />} />
            <Route path="/appointment/:doctorId" element={<AppointmentForm />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
