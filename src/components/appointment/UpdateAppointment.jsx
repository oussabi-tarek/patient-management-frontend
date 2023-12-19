import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateAppointment = ({ appointmentId, token, onUpdateSuccess, onCancel, selectedAppointment }) => {
  // State variables to hold form data
  const [date, setDate] = useState('');
  const [cause, setCause] = useState('');
  const [type, setType] = useState('en ligne');
  const [documents, setDocuments] = useState(null);
  const [selectedDocumentName, setSelectedDocumentName] = useState('');

  // Use effect to update form data when selectedAppointment changes
  useEffect(() => {
    if (selectedAppointment) {
      setDate(new Date(selectedAppointment.date).toISOString().split('T')[0]);
      setCause(selectedAppointment.cause);
      setType(selectedAppointment.type);

      // Set documents only if there are no existing documents
      if (!selectedAppointment.documents || selectedAppointment.documents.length === 0) {
        setDocuments(null);
      }

      // Set selected document name
      setSelectedDocumentName(selectedAppointment.documents[0]?.name || '');
    }
  }, [selectedAppointment]);

  // Function to handle file input change
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setDocuments(file);
    setSelectedDocumentName(file?.name || '');
  };

  // Function to handle the update button click
  const handleUpdate = async () => {
    try {
      const requestData = {
        date,
        cause,
        type,
        documents: {
          name: documents ? documents.name : null,
          type: documents ? documents.type : null,
          data: documents ? await fileToBase64(documents) : null,
        },
      };
  
      await axios.put(`http://localhost:8086/appointments/${appointmentId}`, requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      console.log('Appointment updated successfully');
      onUpdateSuccess();
    } catch (error) {
      console.error('Error updating appointment:', error.response.data.message);
    }
  };
  
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = (error) => reject(error);
    });
  };
  

  return (
    <div className="container">
      <h1 className='font-serif mt-2'>Update Appointment</h1>
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
            />
            {/* Display selected document name */}
            {selectedDocumentName && (
            <div className="mt-2 text-gray-600">Selected Document: {selectedDocumentName}</div>
            )}
        </label>

        {/* Update button */}
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={handleUpdate}
        >
          Update Appointment
        </button>

        {/* Cancel button */}
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UpdateAppointment;
