// UserAppointments.js
import Navbar from '../home/Navbar';
import Footer from '../home/Footer';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateAppointment from './UpdateAppointment';
import '../styles/UserAppointments.css'; // Import your CSS file for styling
import PDF from './PDF';
import PDFViewer from '../home/medecin/PDFViewer';

const token = localStorage.getItem('token');

const UserAppointments = (props) => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showPDF, setShowPDF] = useState(false);
  const [data,setData]=useState([]);
  const onShowPDF=(data)=>{
    setData(data);
    setShowPDF(true);
 }

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
      const response = await axios.get(`http://localhost:8080/appointments`, {
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
      await axios.delete(`http://localhost:8080/appointments/${appointmentId}/documents/${documentIndex}`, {
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
      <Navbar  setIsAuth={props.setIsAuth}/>
      <div className="user-appointments-container mt-9">
        { !showPDF ?
          <>
        <h2>Vos rendez-vous</h2>
        <table className="appointments-table mt-9">
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
                      <div key={index} className='flex flex-row'>
                        {/* Display the document name */}
                        <PDF document={document} onShowPDF={onShowPDF}
                        handleDeleteDocument={handleDeleteDocument} id={appointment._id} index={index}/>
                      </div>
                    ))}
                </td>
                <td>
                    <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        onClick={() => handleUpdateAppointment(appointment._id)}>Mise à jour</button>
                </td>
                <td>
                    <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        onClick={() => handleDeleteAppointment(appointment._id)}>Supprimer</button>
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
        </>
        : 
        <div className='w-full h-full mt-9' id="pdfViewer">
        <PDFViewer data={data} setShowPDF={setShowPDF}/>
        </div>
      }
      </div>
      <Footer />
    </div>
  );
};

export default UserAppointments;
