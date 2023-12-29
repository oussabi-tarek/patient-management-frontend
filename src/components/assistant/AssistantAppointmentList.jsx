import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import '../styles/AssistantDashboard.css';
import UpdateAppointment from '../appointment/UpdateAppointment';

Modal.setAppElement('#root');
const AssistantAppointmentList = () => {
  const [appointments, setAppointments] = useState([]); 
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzhhZmVhOWE1ZWYyOWIzYjM2N2Q4MCIsImlhdCI6MTcwMzYzNjUzMiwiZXhwIjoxNzA2MjI4NTMyfQ.zoyBHFbFmU7P8Rldy9fkUTNdp1EftDHcQKsRzqNefws';
  const [modeModification, setModeModification] = useState(false);
  const [ModifyingAppointment, setModifyingAppointment] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:8086/appointments/forAssistant', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error.message);
      }
    };

    fetchAppointments();
  }, [token,modeModification]);

  const cancelAppointment = async (appointmentId) => {
    try {
      await axios.put(
        `http://localhost:8086/appointments/${appointmentId}/cancel`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId ? { ...appointment, etat: 'annulé' } : appointment
        )
      );
    } catch (error) {
      console.error('Error canceling appointment:', error.message);
    }

    // Fermer le modal après avoir annulé le rendez-vous
    closeCancelModal();
  };

  const validateAppointment = async (appointmentId) => {
    try {
      await axios.put(
        `http://localhost:8086/appointments/${appointmentId}/validate`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId ? { ...appointment, etat: 'réel' } : appointment
        )
      );
    } catch (error) {
      console.error('Error validating appointment:', error.message);
    }
  };
  const openCancelModal = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const closeCancelModal = () => {
    setSelectedAppointment(null);
    setIsModalOpen(false);
  };

  return (
    <div className="mt-10">
      {/* <h1 className="text-2xl font-bold mb-4">Liste des rendez-vous</h1> */}
      {modeModification? (<UpdateAppointment
      appointmentId={ModifyingAppointment._id} 
      token={token} 
      onUpdateSuccess={()=>{setModeModification(false)}} 
      onCancel={()=>setModeModification(false)}
      selectedAppointment = {ModifyingAppointment}
      />):(<>
      
        <table className="m-auto">
        <thead className='bg-gray-100'>
          <tr>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Cause</th>
            <th className="border px-4 py-2">Type</th>
            <th className="border px-4 py-2">État</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment._id} className="border-b">
              <td className="border px-4 py-2">{new Date(appointment.date).toLocaleString()}</td>
              <td className="border px-4 py-2">{appointment.cause}</td>
              <td className="border px-4 py-2">{appointment.type}</td>
              <td className="border px-4 py-2">{appointment.etat}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => openCancelModal(appointment)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Annuler
                </button>
                {appointment.etat === 'en attente' && (
                <button
                  onClick={() => validateAppointment(appointment._id)}
                  className="bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Valider
                </button>
                )}
                {appointment.etat === 'réel' && (
                <button
                  onClick={() => {
                    setModeModification(true);
                    setModifyingAppointment(appointment);
                  }}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Modifier
                </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>     
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeCancelModal}
        contentLabel="Confirmation d'annulation"
        className="Modal"
        overlayClassName="Overlay"
      >
        <div className="flex flex-col items-center p-8">
          <h2 className="text-2xl mb-4">Confirmation d'annulation</h2>
          <p className="mb-4">Êtes-vous sûr de vouloir annuler ce rendez-vous ?</p>
          <div className="flex">
            <button
              onClick={() => cancelAppointment(selectedAppointment._id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Confirmer
            </button>
            <button
              onClick={closeCancelModal}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Annuler
            </button>
          </div>
        </div>
      </Modal>
      </>)
    }
    </div>
  );
};

export default AssistantAppointmentList;
