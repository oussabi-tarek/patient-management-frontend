import React, { useEffect, useState } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./facture.css";

export default function Facture({ consultationId }) {
  const [data, setData] = useState({});

  const [loader, setLoader] = useState(false);

  const downloadPDF = async () => {
    try {
      const capture = document.querySelector(".actual-facture");
      const canvas = await html2canvas(capture);
      const imgData = canvas.toDataURL("img/png");
      const doc = new jsPDF("p", "mm", "a4");
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
      doc.save("rdv.pdf");
      const pdfData = doc.output("blob");

      const formData = new FormData();
      formData.append(
        "document",
        new File([pdfData], "rdv.pdf", { type: "application/pdf" })
      );
      formData.append("consultation", "658c8a397ec56be951781cdd");

      const response = await axios.post(
        "http://localhost:8086/api/saveFacture",
        formData
      );
      console.log("Success:", response.data);
    } catch (error) {
      console.error("Error:", error.response.data);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:8086/api/facture", {
          consultationId,
          // other data fields if needed
        });

        // Assuming the response contains the data you want to set in state
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error as needed
      }
    };

    fetchData();
  }, [consultationId]); // Execute the effect when consultationId changes

  return (
    <div className="w-full h-auto flex justify-center items-center overflow-x-hidden">
      <div className="w-[450px] flex flex-col mt-4 border-2 border-solid border-gray-300 m-4">
        {/* Render your component using the data state */}
        {/* Example: */}
        <div className="w-full flex flex-col justify-center items-center mt-2 bg-white actual-facture">
          <h5>City General Hospital</h5>

          {/* street address and unit number */}
          <h6>789 Health Street</h6>

          <h6>New York, NY 10001</h6>

          <p>01234567890</p>

          <div className="bg-blue-400 text-white flex w-full justify-between items-center p-2">
            Consultation informations
          </div>
          <div className="bg-white text-gray-700 flex w-full justify-between items-center border-t border-gray-300 p-2">
            <span>Ref</span>
            <span>{data.consultation}</span>
          </div>
          <div className="bg-white text-gray-700 flex w-full justify-between items-center border-t border-gray-300 p-2">
            <span>Date</span>
            <span>{data.dateConsultation}</span>
          </div>
          <div className="bg-white text-gray-700 flex w-full justify-between items-center border-t border-gray-300 p-2">
            <span>Type</span>
            <span>{data.typeConsultation}</span>
          </div>
          <div className="bg-white text-gray-700 flex w-full justify-between items-center border-t border-gray-300 p-2">
            <span>Etat</span>
            <span>{data.etatConsultation}</span>
          </div>

          <div className="bg-blue-400 text-white flex w-full justify-between items-center p-2">
            Medcin et Service
          </div>
          <div className="bg-white text-gray-700 flex w-full justify-between items-center border-t border-gray-300 p-2">
            <span>Nom et prenom du Medcin</span>
            <span>{data.doctorName}</span>
          </div>
          <div className="bg-white text-gray-700 flex w-full justify-between items-center border-t border-gray-300 p-2">
            <span>Service</span>
            <span>{data.serviceName}</span>
          </div>

          <div className="bg-blue-400 text-white flex w-full justify-between items-center p-2">
            Patient
          </div>
          <div className="bg-white text-gray-700 flex w-full justify-between items-center border-t border-gray-300 p-2">
            <span>Nom et prenom </span>
            <span>{data.patientName}</span>
          </div>
          <div className="bg-white text-gray-700 flex w-full justify-between items-center border-t border-gray-300 p-2">
            <span>email</span>
            <span>{data.patientEmail}</span>
          </div>
          <div className="bg-white text-gray-700 flex w-full justify-between items-center border-t border-gray-300 p-2">
            <span>Adresse</span>
            <span>{data.patientAddress}</span>
          </div>
          <div className="bg-white text-gray-700 flex w-full justify-between items-center border-t border-gray-300 p-2">
            <span>telephone</span>
            <span>{data.patientTelephone}</span>
          </div>

          <div className="bg-blue-400 text-white flex w-full justify-between items-center p-2">
            Facture
          </div>
          <div className="bg-white text-gray-700 flex w-full justify-between items-center border-t border-gray-300 p-2">
            <span>Delai du payement</span>
            <span>{data.paymentDueDate}</span>
          </div>
          <div className="bg-white text-gray-700 flex w-full justify-between items-center border-t border-gray-300 p-2">
            <span>montant</span>
            <span>{data.montant} MAD</span>
          </div>
          <div className="bg-white text-gray-700 flex w-full justify-between items-center border-t border-gray-300 p-2 mb-5">
            <span>payment Status</span>
            <span>{data.paymentStatus}</span>
          </div>
        </div>
        <div className="receipt-actions-div">
          <div className="actions-right">
            <button
              className="receipt-modal-download-button"
              onClick={downloadPDF}
              disabled={!(loader === false)}
            >
              {loader ? <span>Downloading</span> : <span>Enregistrer</span>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
