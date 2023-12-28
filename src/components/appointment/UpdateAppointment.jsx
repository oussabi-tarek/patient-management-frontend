import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateAppointment = ({
  appointmentId,
  token,
  onUpdateSuccess,
  onCancel,
  selectedAppointment,
}) => {
  // State variables to hold form data
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [cause, setCause] = useState('');
  const [type, setType] = useState('en ligne');
  const [documents, setDocuments] = useState([]);
  const [selectedDocumentNames, setSelectedDocumentNames] = useState([]);
  const [doctorId, setDoctorId] = useState('');
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

  // Use effect to update form data when selectedAppointment changes
  useEffect(() => {
    if (selectedAppointment) {
      setDate(new Date(selectedAppointment.date).toISOString().split('T')[0]);
      setCause(selectedAppointment.cause);
      setType(selectedAppointment.type);
      setDoctorId(selectedAppointment.medecin);

      // Set documents only if there are existing documents
      if (selectedAppointment.documents && selectedAppointment.documents.length > 0) {
        // Set selected document names
        setSelectedDocumentNames(
          selectedAppointment.documents.map((doc) => doc.name)
        );
      }
    }
    if (date) {
      checkAvailability();
    }
  }, [selectedAppointment, date]);


  // Function to handle file input change
  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setDocuments([...documents, ...newFiles]);
    const newDocumentNames = newFiles.map((file) => file.name);
    setSelectedDocumentNames([...selectedDocumentNames, ...newDocumentNames]);
  };

  // Function to handle document deletion
  const handleDeleteDocument = (index) => {
    const updatedDocuments = [...documents];
    updatedDocuments.splice(index, 1);
    setDocuments(updatedDocuments);

    const updatedDocumentNames = [...selectedDocumentNames];
    updatedDocumentNames.splice(index, 1);
    setSelectedDocumentNames(updatedDocumentNames);
  };

  const handleUpdate = async () => {
    try {
      // Convert each file to a base64-encoded string
      const filePromises = documents.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });
  
      // Wait for all files to be converted
      const fileContents = await Promise.all(filePromises);
  
      // Prepare the request data
      const requestData = {
        date,
        cause,
        type,
        doctorId,
        time,
        documents: documents.map((file, index) => ({
          name: file.name,
          type: file.type,
          data: fileContents[index].split(',')[1], // Extract base64 content
        })),
      };
  
      // Send the request
      await axios.put(
        `http://localhost:8086/appointments/${appointmentId}`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      console.log('Appointment updated successfully');
      onUpdateSuccess();
    } catch (error) {
      console.error('Error updating appointment:', error.response.data.message);
    }
  };  

  return (
    <div className="container">
      <h1 className="font-serif mt-2">Mettre à jour le rendez-vous</h1>
      <div className="max-w-sm m-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-4">
        {/* Date input */}
        <label className="block text-sm font-medium text-gray-700">
          Date:
          <input
            type="date"
            className="mt-1 p-2 block w-full border rounded-md"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        {/* Time select */}
        <label className="block text-sm font-medium text-gray-700">
          Time:
          <select
            className="mt-1 p-2 block w-full border rounded-md"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
            disabled={!isDateAvailable} // Disable if date is not available
          >
            <option value="">Sélectionnez l'heure</option>
            {availableTimes.map((availableTime, index) => (
              <option key={index} value={availableTime}>
                {availableTime}
              </option>
            ))}
          </select>
        </label>
        {/* Cause input */}
        <label className="block text-sm font-medium text-gray-700">
          Cause:
          <input
            type="text"
            className="mt-1 p-2 block w-full border rounded-md"
            value={cause}
            onChange={(e) => setCause(e.target.value)}
          />
        </label>

        {/* Type select */}
        <label className="block text-sm font-medium text-gray-700">
          Type:
          <select
            className="mt-1 p-2 block w-full border rounded-md"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="en ligne">En Ligne</option>
            <option value="sur place">Sur Place</option>
          </select>
        </label>

        {/* Documents file input */}
        <label className="block text-sm font-medium text-gray-700">
          Documents:
          <input
            type="file"
            className="mt-1 p-2 block w-full border rounded-md"
            onChange={handleFileChange}
            multiple // Enable multiple file selection
          />
        </label>

        {/* Update button */}
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={handleUpdate}
        >
          Mettre à jour le rendez-vous
        </button>

        {/* Cancel button */}
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={onCancel}
        >
          Annuler
        </button>
      </div>
    </div>
  );
};

export default UpdateAppointment;
