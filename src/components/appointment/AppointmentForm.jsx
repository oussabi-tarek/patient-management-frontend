import React, { useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../home/Navbar';
import Footer from '../home/Footer';
import '../styles/appointment.css';

const AppointmentForm = () => {
  const { doctorId } = useParams();
  const [date, setDate] = useState('');
  const [time, setTime] = useState(''); // Add state for time
  const [cause, setCause] = useState('');
  const [type, setType] = useState('en ligne');
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [availableTimes, setAvailableTimes] = useState([]);
  const [isDateAvailable, setIsDateAvailable] = useState(true);

  const checkAvailability = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8086/check-availability`,
        { doctorId, date }
      );

      const existingAppointments = response.data.existingAppointments;

      // Extract hours and minutes from the existing appointments and format them as "HH:mm"
      const reservedTimes = existingAppointments.map(appointment => {
        const appointmentDate = new Date(appointment.date);
        const hours = appointmentDate.getUTCHours().toString().padStart(2, '0');
        const minutes = appointmentDate.getUTCMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
      });

      // Calculate available times based on your working hours
      const workingHours = ['08:30', '09:30', '10:30', '11:30', '14:30', '15:30', '16:30', '17:30'];
      const availableTimes = workingHours.filter(time => !reservedTimes.includes(time));

      setAvailableTimes(availableTimes);

      // Check if all times are taken
      setIsDateAvailable(availableTimes.length > 0);
    } catch (error) {
      console.error('Error checking availability:', error);
    }
  }; 

  useEffect(() => {
    if (date) {
      checkAvailability();
    }
  }, [date]);

  const handleCreateAppointment = async () => {
    try {
      // Check if required fields are empty
      if (!date || !time || !cause || !type || !documents) {
        setError('Please fill in all required fields.');
        return;
      }

       // Check if the number of documents exceeds the limit (5)
       if (documents.length > 5) {
        setError('You can only upload up to 5 documents.');
        return;
      }
  
      const requestData = new FormData();
      requestData.append('date', date);
      requestData.append('cause', cause);
      requestData.append('type', type);
      requestData.append('medecinId', doctorId);
      requestData.append('time', time);
  
      // Append all files with the same key
      for (let i = 0; i < documents.length; i++) {
        requestData.append('documents', documents[i]);
      }
  
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
            Time:
            <select
              className="mt-1 p-2 block w-full border rounded-md"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              disabled={!isDateAvailable} // Disable if date is not available
            >
              <option value="">Select Time</option>
              {availableTimes.map((availableTime, index) => (
                <option key={index} value={availableTime}>
                  {availableTime}
                </option>
              ))}
            </select>
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
            Documents (Up to 5 documents):
            <input
              type="file"
              className="mt-1 p-2 block w-full border rounded-md"
              onChange={(e) => setDocuments(e.target.files)}
              multiple  // Enable multiple file selection
            />
          </label>
          {error && <p className="text-red-500">{error}</p>}
          {!isDateAvailable && (
            <p className="text-red-500">All times for this date are taken. Please choose another date.</p>
          )}
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={handleCreateAppointment}
            disabled={!isDateAvailable} 
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
