import CheckBox from './CheckBox';
import {useEffect, useState} from 'react';
import LOGO from '../../../assets/logo.png';
import List from './List';
import jsPDF from 'jspdf';
import listeAnalyses from "../../../files/Analyse";
import axios from "axios";

function Form(props){
   const [medicaments,setMedicaments]=useState([]);
   const [analyses,setAnalyses]=useState([]);
   const [medicament,setMedicament]=useState('');
   const [nbrPrise,setNbrPrise]=useState('');
   const [duration,setDuration]=useState('');
   const onAddMedicamentAndNbrPrise=()=>{
    if(medicament!=="" && nbrPrise!==""){
         const nvMedicament={
            med:medicament,
            prise:nbrPrise
         }
         console.log(nvMedicament);
        setMedicaments([...medicaments,nvMedicament]);
        setMedicament('');
        setNbrPrise('');
    }
   } 
   const onAnalyseChoose=(e)=>{
    const updateAnalyses=analyses;
    updateAnalyses.push(e.target.value);
    setAnalyses(updateAnalyses);
   }
   const onAddMedicament=(e)=>{
    setMedicament(e.target.value);
    const medicament=props.medicamentsto_choose.medicaments.filter(medicament=>medicament.nom===e.target.value);
    if(medicament[0].duration!=="à vie")
       setDuration(medicament[0].duration);
    setNbrPrise(medicament[0].prise);
   }
   const onAddNbrPrise=(e)=>{
      setNbrPrise(e.target.value);
   }
   const generateOrdonnance=(e)=>{
    e.preventDefault();
     var doc = new jsPDF('p', 'pt');
 
    doc.addImage(LOGO,'PNG', 220, 10, 50, 50); 
    doc.text(280, 45, 'Santé Connectée');
    doc.setFillColor(255,255,200);
    doc.rect(250, 80, 110, 30, 'F');
    doc.text(260, 100, 'Ordonnance');
    const date=new Date();
    doc.text(50,160,'Marrakech le: '+date.getDay()+"/"+date.getMonth()+"/"+date.getFullYear());
    //
    doc.setFont('helvetica')
    doc.text(100,180, 'Pour Monsieur: '+props.patient.nom+" "+props.patient.prenom);
    doc.setFont('helvetica')
    doc.text(100, 200, 'Chez Monsieur: '+props.medecin.nom+" "+props.medecin.prenom);
    doc.setFont('helvetica');
    doc.text(50, 250, 'Liste des Médicaments: ');
    let i=0;
    medicaments.map((medicament,index)=>{
      if(index===0)
        return doc.text(80,270+i,medicament.med+"-"+medicament.prise);
      else{
        i=i+20;
        return doc.text(80,270+i,medicament.med+"-");
      }
    });

     doc.text(50, 310+i, 'Liste des Analyses: ');
     analyses.map((analyse,index)=>{
      if(index===0)
       return doc.text(80,330+i,analyse);
      else{
        i=i+20;
       return doc.text(80,330+i,analyse);
      }
      });
 
    doc.save('ordonnance.pdf');
    const pdfDataUri = doc.output('datauristring');

    axios
    .post("http://localhost:8086/api/consultations/"+props.rendezVousId, { 
       ordonnance:pdfDataUri,
       description:"ss",
       etat:"close"
     })
    .then((r) => {
      // localStorage.setItem("user", JSON.stringify(r.data.user));
      // console.log(r.data.user);
      // localStorage.setItem("token",r.data.token);
      // props.setIsAuth(true);
      // window.location.href = '/medecin';
    })
    .catch((e) => {
       console.log("Auth Error", e)
    });
   }
    const onDeleteMedicament = (medicament) => {
        medicaments.map((med,index)=>{
          if(med.med === medicament.med && med.prise === medicament.prise){
            medicaments.splice(index,1);
            setMedicaments([...medicaments]);
          }
        })
    }
  return(
    <form className="mr-20 ml-20" onSubmit={generateOrdonnance}>
    <div className="mb-5">  
        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
        <select id="countries" value={medicament}
        onChange={onAddMedicament}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option value="">Choisir Medicament</option>
        
      {  props.medicamentsto_choose.medicaments!==undefined && 
           props.medicamentsto_choose.medicaments.map((medicament,index)=>{
               return (<option key={index} value={medicament.nom}>
                {medicament.nom}
                </option>)
           })
           
      }
        </select>
    </div>
    <div className="mb-5">
        <label htmlFor="nbr_prise" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre de prise</label>
        <input type="text" onChange={onAddNbrPrise} value={nbrPrise} id="nbr_prise" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
    </div>
    { duration!=="" &&
    <div className="mb-5">
        <label htmlFor="duration" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre de prise</label>
        <input type="text"  disabled="true" value={duration} id="duration" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
    </div>
    }
    <button type="button" onClick={onAddMedicamentAndNbrPrise} className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs w-full sm:w-auto px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Ajouter</button>
    <List medicaments={medicaments} onDeleteMedicament={onDeleteMedicament}/> 
     <div className='mb-6 mt-6'>
            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Liste des analyses</h3>
            <div className='inline-grid gap-14 grid-cols-4'>
            {
              listeAnalyses.map((analyse,index)=>{
                return(
                   <CheckBox key={index} analyse={analyse}  onAnalyseChoose={onAnalyseChoose}/>
                )
              })
            }
            </div>
     </div>

    <button type="submit"  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Generer</button>
    </form>
  )
}
export default Form;