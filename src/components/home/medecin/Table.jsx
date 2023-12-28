import moment from 'moment';
import 'moment/locale/fr';
import Pdf from './Pdf';
import { useState } from 'react';
import PDFViewer from './PDFViewer';

function Table(propos){
  const [showPdf,setShowPDF]=useState(false);
  const [data,setData]=useState([]);
  const formatDate = (date) => {
    const momentObj = moment(date);
    const formattedDateTime = momentObj.format('dddd DD MMMM YYYY [à] HH:mm:ss');
    return formattedDateTime;
  }
  const onShowPDF=(data)=>{
     setData(data);
     setShowPDF(true);
  }
 return(
    !showPdf ?
  <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                    Date
                </th>
                <th scope="col" className="px-6 py-3">
                    Cause
                </th>
                <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                    Type
                </th>
                <th scope="col" className="px-6 py-3">
                    Documents
                </th>
                <th scope="col" className="px-6 py-3">
                    Ordonnance
                </th>
                <th scope="col" className="px-6 py-3">
                    Analyses
                </th>
                <th scope="col" className="px-6 py-3">
                    Scanners
                </th>
            </tr>
        </thead>
        <tbody>
            {
                propos.historiqueRendezVous.map((rendezVous)=>{
                    return(
                        <tr key={rendezVous._id} className="border-b border-gray-200 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                               {formatDate(rendezVous.date)}
                            </th>
                            <td className="px-6 py-4">
                                {rendezVous.cause}
                            </td>
                            <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                                {rendezVous.type}
                            </td>
                            <td className="px-6 py-4">
                                {
                                rendezVous.documents.map((document)=>{
                                    return (
                                        <Pdf ordonnance={document} onShowPDF={onShowPDF}/>
                                    )
                                })}
                            </td>
                            <td className="px-6 py-4">
                                { 
                                rendezVous.consultation!==undefined &&
                                <Pdf ordonnance={rendezVous.consultation.ordonnance} onShowPDF={onShowPDF}/>
                                }
                            </td>
                            <td className="px-6 py-4">
                                {
                                rendezVous.consultation!==undefined &&
                                rendezVous.consultation.analyses.map((document)=>{
                                    return (
                                        <Pdf ordonnance={document} onShowPDF={onShowPDF}/>
                                    )
                                })}
                            </td>
                            <td className="px-6 py-4">
                                {
                                rendezVous.consultation!==undefined &&
                                rendezVous.consultation.scanner.map((document)=>{
                                    return (
                                        <Pdf ordonnance={document} onShowPDF={onShowPDF}/>
                                    )
                                })}
                            </td>
                        </tr>
                    )
                })
            }
        </tbody>
    </table>
   </div>: <PDFViewer data={data} setShowPDF={setShowPDF} />
 )
}
export default Table;