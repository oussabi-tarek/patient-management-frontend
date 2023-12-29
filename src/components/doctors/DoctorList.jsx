// DoctorListPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../home/Navbar'; // Import the Navbar component
import Footer from '../home/Footer'; // Import the Footer component
import DoctorCard from './DoctorCard';
import { useParams } from 'react-router-dom'; // Import useParams hook
import '../styles/doctor.css'; // Import your CSS file

const DoctorList = () => {
    const { serviceName } = useParams();
    const [doctors, setDoctors] = useState([]);
  
    useEffect(() => {
      axios.get(`http://localhost:8080/medecins/${serviceName}`)
        .then(response => {
          setDoctors(response.data);
        })
        .catch(error => {
          console.error('Error fetching doctors:', error);
        });
    }, [serviceName]);
  
    return (
      <div>
      <Navbar />
      <div className='container'>
          <div className='heading-container'>
              <h1 className='font-serif mt-9'>Médecins en {serviceName}</h1>
          </div>
          <div className='doctor-cards'>
              {doctors.map(doctor => (
                  <DoctorCard key={doctor._id} doctor={doctor} />
              ))}
          </div>
      </div>
      <Footer/>
  </div>
    );
  };
  
  export default DoctorList;