// UserAppointments.js
import Navbar from '../home/Navbar';
import Footer from '../home/Footer';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateAppointment from './UpdateAppointment';
import '../styles/UserAppointments.css'; // Import your CSS file for styling

const token = localStorage.getItem('token');

const UserAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleDeleteAppointment = async (appointmentId) => {
    try {
      await axios.delete(`http://localhost:8080/appointments/${appointmentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Appointment deleted successfully');
      fetchAppointments();
    } catch (error) {
      console.error('Error deleting appointment:', error.response.data.message);
    }
  };

  const handleUpdateAppointment = (appointmentId) => {
    const selected = appointments.find((appointment) => appointment._id === appointmentId);
    setSelectedAppointment(selected);
  };

  const handleCancelUpdate = () => {
    setSelectedAppointment(null);
  };

  const onUpdateSuccess = () => {
    setSelectedAppointment(null);
    fetchAppointments();
  };

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`http://localhost:8086/appointments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error.response.data.message);
    }
  };

  const handleDeleteDocument = async (appointmentId, documentIndex) => {
    try {
      await axios.delete(`http://localhost:8086/appointments/${appointmentId}/documents/${documentIndex}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Document deleted successfully');
      fetchAppointments();
    } catch (error) {
      console.error('Error deleting document:', error.response.data.message);
    }
  };
  

  return (
    <div >
      <Navbar />
      <div className="user-appointments-container">
        <h2>Your Appointments</h2>
        <table className="appointments-table">
            <thead>
            <tr>
                <th>Date</th>
                <th>Cause</th>
                <th>Type</th>
                <th>Etat</th>
                <th>Documents</th>
                <th>Actions</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {appointments.map((appointment) => (
                <tr key={appointment._id}>
                <td>{appointment.date}</td>
                <td>{appointment.cause}</td>
                <td>{appointment.type}</td>
                <td>{appointment.etat}</td>
                <td>
                    {appointment.documents.map((document, index) => (
                      <div key={index}>
                        {/* Display the document name */}
                        {document.name}

                        {/* Provide a download link */}
                        <a
                          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                          href={`http://localhost:8086/documents/${appointment._id}/${index}`}
                          download={document.name}
                        >
                          Download
                        </a>

                        {/* Add a Delete button */}
                        <button
                          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                          onClick={() => handleDeleteDocument(appointment._id, index)}
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                </td>
                <td>
                    <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        onClick={() => handleUpdateAppointment(appointment._id)}>Update</button>
                </td>
                <td>
                    <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        onClick={() => handleDeleteAppointment(appointment._id)}>Delete</button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>

        {selectedAppointment && (
            <UpdateAppointment
            appointmentId={selectedAppointment._id}
            token={token}
            onUpdateSuccess={onUpdateSuccess}
            onCancel={handleCancelUpdate}
            selectedAppointment={selectedAppointment}
            />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default UserAppointments;
