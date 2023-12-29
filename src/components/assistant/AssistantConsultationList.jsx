import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AssistantConsultationList() {
    const [consultations, setConsultations] = useState([]);
    const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzhhZmVhOWE1ZWYyOWIzYjM2N2Q4MCIsImlhdCI6MTcwMzYzNjUzMiwiZXhwIjoxNzA2MjI4NTMyfQ.zoyBHFbFmU7P8Rldy9fkUTNdp1EftDHcQKsRzqNefws';
    useEffect(() => {
      // Charger les consultations depuis l'API
      const fetchConsultations = async () => {
        try {
          const response = await axios.get('http://localhost:8086/consultations/unbilled',{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }); // Remplacez l'URL par votre endpoint
          setConsultations(response.data);
        } catch (error) {
          console.error('Erreur lors du chargement des consultations :', error.message);
        }
      };
  
      fetchConsultations();
    }, []); // Exécuter une seule fois lors du montage
  
    const handleFacturer = (consultationId) => {
      // Logique de facturation à implémenter
      console.log('Facturation de la consultation avec ID :', consultationId);
    };
  
    const handleCloturer = (consultationId) => {
      // Logique de clôture à implémenter
      console.log('Clôture de la consultation avec ID :', consultationId);
    };
  
    return (
      <div className='mt-10'>
        {/* <h1>Dashboard de l'Assistant</h1> */}
        <table className="m-auto">
        <thead className='bg-gray-100'>
          <tr>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">État</th>
            <th className="border px-4 py-2">Patient</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
          <tbody>
            {consultations.map((consultation) => (
              <tr key={consultation._id} className="border-b">
                <td className="border px-4 py-2">{new Date(consultation.date).toLocaleDateString()}</td>
                <td className="border px-4 py-2">{consultation.description}</td>
                <td className="border px-4 py-2">{consultation.etat}</td>
                <td className="border px-4 py-2">{consultation.patient.nom}&nbsp;{consultation.patient.prenom}</td>
                <td className="border px-4 py-2">{consultation.patient.email}</td>
                <td className="border px-4 py-2">
                <button
                  onClick={() => handleCloturer(consultation._id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Clôturer
                </button>
                <button
                  onClick={() => handleFacturer(consultation._id)}
                  className="bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Facturer
                </button>
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      /////
    );
}

export default AssistantConsultationList