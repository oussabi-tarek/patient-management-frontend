import React, { useState, useEffect } from 'react';

function PDF(props){

  const [numPages, setNumPages] = useState(null);
  const [fileSize, setFileSize] = useState(null);

  const onDownload=()=>{
    // Convert the base64 buffer to Uint8Array
    const buffer = props.document.data.data;
    const uint8Array = new Uint8Array(buffer);

    // Create a Blob from the Uint8Array
    const blob = new Blob([uint8Array], { type: props.document.type });

    // Create a URL for the Blob
    const blobUrl = URL.createObjectURL(blob);

    // Create a link element
    const link = document.createElement('a');

    // Set the href attribute of the link to the Blob URL
    link.href = blobUrl;

    // Specify the filename for the downloaded file
    link.download = props.document.name;

    // Append the link to the body
    document.body.appendChild(link);

    // Trigger a click on the link to start the download
    link.click();

    // Remove the link from the body
    document.body.removeChild(link);

    // Revoke the Blob URL to free up resources
    URL.revokeObjectURL(blobUrl);

  }

  useEffect(()=>{
    const extractPdfInfo = async () => {
        try {    
            console.log(props.document);
        const size = props.document.data.data.length;
        const sizeInMegabytes = (size / (1024 * 1024)).toFixed(2);
        setFileSize(sizeInMegabytes);
        } catch (error) {
          console.error('Erreur lors de l\'extraction des informations PDF :', error);
        }
      };
      extractPdfInfo();
  },[])
  const displayDocument=()=>{
    props.onShowPDF(props.document.data.data);
  }
  
  return(
    <div className="flex items-start gap-2.5">
   <div className="flex flex-col gap-1">
    
      <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
         <div className="flex items-start bg-gray-50 dark:bg-gray-600 rounded-xl p-2">
            <div className="me-2">
               <span className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white pb-2">
                  <svg fill="none" aria-hidden="true" className="w-5 h-5 flex-shrink-0" viewBox="0 0 20 21">
                     <g clipPath="url(#clip0_3173_1381)">
                        <path fill="#E2E5E7" d="M5.024.5c-.688 0-1.25.563-1.25 1.25v17.5c0 .688.562 1.25 1.25 1.25h12.5c.687 0 1.25-.563 1.25-1.25V5.5l-5-5h-8.75z"/>
                        <path fill="#B0B7BD" d="M15.024 5.5h3.75l-5-5v3.75c0 .688.562 1.25 1.25 1.25z"/>
                        <path fill="#CAD1D8" d="M18.774 9.25l-3.75-3.75h3.75v3.75z"/>
                        <path fill="#F15642" d="M16.274 16.75a.627.627 0 01-.625.625H1.899a.627.627 0 01-.625-.625V10.5c0-.344.281-.625.625-.625h13.75c.344 0 .625.281.625.625v6.25z"/>
                        <path fill="#fff" d="M3.998 12.342c0-.165.13-.345.34-.345h1.154c.65 0 1.235.435 1.235 1.269 0 .79-.585 1.23-1.235 1.23h-.834v.66c0 .22-.14.344-.32.344a.337.337 0 01-.34-.344v-2.814zm.66.284v1.245h.834c.335 0 .6-.295.6-.605 0-.35-.265-.64-.6-.64h-.834zM7.706 15.5c-.165 0-.345-.09-.345-.31v-2.838c0-.18.18-.31.345-.31H8.85c2.284 0 2.234 3.458.045 3.458h-1.19zm.315-2.848v2.239h.83c1.349 0 1.409-2.24 0-2.24h-.83zM11.894 13.486h1.274c.18 0 .36.18.36.355 0 .165-.18.3-.36.3h-1.274v1.049c0 .175-.124.31-.3.31-.22 0-.354-.135-.354-.31v-2.839c0-.18.135-.31.355-.31h1.754c.22 0 .35.13.35.31 0 .16-.13.34-.35.34h-1.455v.795z"/>
                        <path fill="#CAD1D8" d="M15.649 17.375H3.774V18h11.875a.627.627 0 00.625-.625v-.625a.627.627 0 01-.625.625z"/>
                     </g>
                     <defs>
                        <clipPath id="clip0_3173_1381">
                           <path fill="#fff" d="M0 0h20v20H0z" transform="translate(0 .5)"/>
                        </clipPath>
                     </defs>
                  </svg>
                  <button type='button' onClick={displayDocument}>
                  {props.document.name}
                  </button>
               </span>
               <span className="flex text-xs font-normal text-gray-500 dark:text-gray-400 gap-2">
                  1 Page 
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="self-center" width="3" height="4" viewBox="0 0 3 4" fill="none">
                     <circle cx="1.5" cy="2" r="1.5" fill="#6B7280"/>
                  </svg>
                  {fileSize} MB 
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="self-center" width="3" height="4" viewBox="0 0 3 4" fill="none">
                     <circle cx="1.5" cy="2" r="1.5" fill="#6B7280"/>
                  </svg>
                  {props.document.type}
               </span>
            </div>
            <div className="inline-flex self-center items-center">
               <button onClick={onDownload} className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-600 dark:hover:bg-gray-500 dark:focus:ring-gray-600" type="button">
                  <svg className="w-4 h-4 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                     <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z"/>
                     <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
                  </svg>
               </button>
               <button onClick={()=>props.handleDeleteDocument(props.id,props.index)} type="button" className="absolue right-0 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
               <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                   <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
               </svg>
               <span className="sr-only">Close</span>
                 </button>
            </div>
         </div>
      </div>
      {/* </button> */}
   </div>
</div>
  )
}

export default PDF;