import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DoctorCard = ({ doctor }) => {
  const [imageDataUrl, setImageDataUrl] = useState('');

  useEffect(() => {
    console.log(doctor.image);

    // Convert the buffer to a data URL using FileReader
    const reader = new FileReader();
    reader.onload = () => {
      console.log(reader.result); // Log the result inside the callback
      setImageDataUrl(reader.result);
    };

    // Assuming the doctor.image is a Buffer
    // Convert it to a Uint8Array to create a Blob
    const bufferArray = new Uint8Array(doctor.image.data);
    const blob = new Blob([bufferArray], { type: 'image/jpeg' });

    reader.readAsDataURL(blob);
  }, [doctor.image]);

  return (
    <div className="max-w-sm m-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Link to={`/doctors/${doctor._id}`}>
        <img
            className="rounded-t-lg"
            src={imageDataUrl}
            alt={`${doctor.nom} ${doctor.prenom}'s photo`}
            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
          />      
      </Link>
      <div className="p-5">
        <Link to={`/doctors/${doctor._id}`}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {doctor.nom} {doctor.prenom}
          </h5>
        </Link>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-sm">
          {doctor.email}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-sm">
          {doctor.adresse}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-sm">
          {doctor.telephone}
        </p>
        <Link
          to={`/appointment/${doctor._id}`}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Prendre rendez-vous
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default DoctorCard;
