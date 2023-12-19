import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../home/Navbar';
import Footer from '../home/Footer';
import '../styles/appointment.css';

const AppointmentForm = () => {
  const { doctorId } = useParams();
  const [date, setDate] = useState('');
  const [cause, setCause] = useState('');
  const [type, setType] = useState('en ligne');
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleCreateAppointment = async () => {
    try {
      // Check if required fields are empty
      if (!date || !cause || !type || !documents) {
        setError('Please fill in all required fields.');
        return;
      }

      const requestData = new FormData();
      requestData.append('date', date);
      requestData.append('cause', cause);
      requestData.append('type', type);
      requestData.append('documents', documents);
      requestData.append('medecinId', doctorId);

      await axios.post(`http://localhost:8086/appointments`, requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Appointment created successfully');
      setError('');
      navigate('/appointments');
    } catch (error) {
      console.error('Error creating appointment:', error);
      setError('Error creating appointment. Please try again.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1 className='font-serif mt-2'>Create New Appointment</h1>
        <div className="max-w-sm m-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-4">
          <label className="block text-sm font-medium text-gray-700">
            Date:
            <input
              type="date"
              className="mt-1 p-2 block w-full border rounded-md"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </label>
          <label className="block text-sm font-medium text-gray-700">
            Cause:
            <input
              type="text"
              className="mt-1 p-2 block w-full border rounded-md"
              value={cause}
              onChange={(e) => setCause(e.target.value)}
              required
            />
          </label>
          <label className="block text-sm font-medium text-gray-700">
            Type:
            <select
              className="mt-1 p-2 block w-full border rounded-md"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option value="">Select Type</option>
              <option value="en ligne">En Ligne</option>
              <option value="sur place">Sur Place</option>
            </select>
          </label>
          <label className="block text-sm font-medium text-gray-700">
            Documents:
            <input
              type="file"
              className="mt-1 p-2 block w-full border rounded-md"
              onChange={(e) => setDocuments(e.target.files[0])}
            />
          </label>
          {error && <p className="text-red-500">{error}</p>}
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={handleCreateAppointment}
          >
            Create Appointment
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AppointmentForm;
