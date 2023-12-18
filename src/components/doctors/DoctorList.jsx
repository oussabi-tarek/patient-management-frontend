// DoctorListPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../home/Navbar'; // Import the Navbar component
import Footer from '../home/Footer'; // Import the Footer component
import DoctorCard from './DoctorCard';
import { useParams } from 'react-router-dom'; // Import useParams hook

const DoctorList = () => {
    const { serviceName } = useParams();
    const [doctors, setDoctors] = useState([]);
  
    useEffect(() => {
      axios.get(`http://localhost:8086/medecins/${serviceName}`)
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
        <div className='flex  p-20 w-full justify-between'>
            <h2>Doctors in {serviceName}</h2>
        </div>
        <div>
          {doctors.map(doctor => (
            <DoctorCard key={doctor._id} doctor={doctor} />
          ))}
        </div>
        <Footer />
      </div>
    );
  };
  
  export default DoctorList;