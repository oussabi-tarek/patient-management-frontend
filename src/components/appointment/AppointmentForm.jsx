import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import axios from 'axios';

const AppointmentForm = () => {
  const { doctorId } = useParams(); // Get the doctorId from route params
  const [date, setDate] = useState('');
  const [cause, setCause] = useState('');
  const [type, setType] = useState('en ligne');
  const [documents, setDocuments] = useState(null);
  const token = localStorage.getItem('token');
  
  const handleCreateAppointment = async () => {
    try {  
      const requestData = new FormData();
      requestData.append('date', date);
      requestData.append('cause', cause);
      requestData.append('type', type);
      requestData.append('documents', documents);
      requestData.append('medecinId', doctorId);

      await axios.post(`http://localhost:8086/appointments`, requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
          // 'Content-Type': 'multipart/form-data', // No need to set this header manually, Axios will set it for FormData
        },
      });
  
      console.log('Appointment created successfully');
    } catch (error) {
      console.error('Error creating appointment:', error);
      // Handle the error, show a message to the user, etc.
    }
  };
  
  

  return (
    <div>
      <label>
        Date:
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </label>
      <label>
        Cause:
        <input type="text" value={cause} onChange={(e) => setCause(e.target.value)} />
      </label>
      <label>
        Type:
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="en ligne">En Ligne</option>
          <option value="sur place">Sur Place</option>
        </select>
      </label>
      <label>
        Documents:
        <input type="file" onChange={(e) => setDocuments(e.target.files[0])} />
      </label>
      <button onClick={handleCreateAppointment}>Create Appointment</button>
    </div>
  );
};

export default AppointmentForm;
