import React from "react";
import axios from "axios";

export default function DownloadFacture({ consultationId }) {
  const handleDownloadFacture = async () => {
    try {
      // Make a POST request to retrieve the facture PDF
      const response = await axios.post(
        "http://localhost:8086/api/getFacture",
        { consultationId },
        {
          responseType: "blob",
        }
      );

      // Create a Blob from the response data
      const blob = new Blob([response.data], { type: "application/pdf" });

      // Create a link element and trigger the download
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "facture.pdf";
      link.click();
    } catch (error) {
      console.error("Error downloading facture:", error.message);
    }
  };
  return (
    <div>
      <button onClick={handleDownloadFacture} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
        <svg
          class="fill-current w-4 h-4 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
        </svg>
        <span>Telecharger la  Facture</span>
      </button>
    </div>
  );
}
