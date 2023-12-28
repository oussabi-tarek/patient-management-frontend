import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Table from './Table';
import axios from 'axios';
import Form from './Form';
import PatientInformations from './PatientInformations';
import listeDesMedicaments from "../../../files/Medicament";

function Details(){
   const params=useParams();
   const [historiqueRendezVous,setHistoriqueRendezVous]=useState([]);
   const [medicamentsto_choose,setMedicamentsToChoose]=useState({});
   const [rendezVousId,setRendezVousId]=useState("");
   const [patient,setPatient]=useState({});
   const [medecin,setMedecin]=useState({});
   const [activeTab, setActiveTab] = useState('informations');
   useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("user"));
    setRendezVousId(params.idRendezVous);
    axios
     .get("http://localhost:8080/appointments/doctor/"+user.id+"/patient/"+params.id,{ 
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
   })
   .then((r) => {
    setHistoriqueRendezVous(r.data);
    console.log("h:"+historiqueRendezVous);
    setPatient(r.data[0].patient);
    setMedecin(r.data[0].medecin);
    if(r.data[0].medecin.service.libelle==="cardiologie"){
        setMedicamentsToChoose(listeDesMedicaments[0]);
    }
    else if(r.data[0].medecin.service.libelle==="rhumatologie"){
        setMedicamentsToChoose(listeDesMedicaments[1]);
    }
    else{
        listeDesMedicaments[2].medicaments.map((medicament)=>{
            if(medicament.nom==="Novorapid")
               return medicament.nom=medicament.nom+"("+medicament.type+")"+" + "+medicament.plus+"("+medicament.plus_prise+")";
            else
              return medicament.nom=medicament.nom+"("+medicament.type+")";
        })
        setMedicamentsToChoose(listeDesMedicaments[2]);
    }
    
    console.log(r.data);
  })
  .catch((e) => {
     console.log("Auth Error", e)
   });
  },[])
   const onTabClick = (tab) => {
         if(tab==="page des rendez-vous"){
            window.location.href="/medecin";
         }
         setActiveTab(tab);
    } 
   
  return(
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800" id="defaultTab" data-tabs-toggle="#defaultTabContent" role="tablist">
        <li className="me-2">
            <button id="about-tab" onClick={()=>onTabClick("informations")} data-tabs-target="#about" type="button" role="tab" aria-controls="about" aria-selected="true" className={`${activeTab==="informations" ? "text-blue-600":""} inline-block p-4  rounded-ss-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-blue-500`}>Informations Patient</button>
        </li>
        <li className="me-2">
            <button id="services-tab" onClick={()=>onTabClick("historique")} data-tabs-target="#services" type="button" role="tab" aria-controls="services" aria-selected="false" className={`${activeTab==="historique" ? "text-blue-600":""} inline-block p-4 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300`}>Historique</button>
        </li>    
        {
            params.enCours==="true" &&
        <li className="me-2">
            <button id="statistics-tab" onClick={()=>onTabClick("ordonnance")}  data-tabs-target="#statistics" type="button" role="tab" aria-controls="statistics" aria-selected="false" className={`${activeTab==="ordonnance" ? "text-blue-600":""} inline-block p-4 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300`}>Ordonnance</button>
        </li>
        }
        <li className="me-2">
            <button id="services-tab" onClick={()=>onTabClick("page des rendez-vous")} data-tabs-target="#services" type="button" role="tab" aria-controls="services" aria-selected="false" className={`${activeTab==="" ? "text-blue-600":""} inline-block p-4 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300`}>Page des rendez-vous</button>
        </li>
    </ul>
    <div id="defaultTabContent">
        <div className={`${activeTab==="informations" ?  '':'hidden'} p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800`} id="about" role="tabpanel" aria-labelledby="about-tab">
            <PatientInformations  patient={patient} />
        </div>
        <div className={`${activeTab==="historique" ?  '':'hidden'} p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800`} id="services" role="tabpanel" aria-labelledby="services-tab">
            <h2 className="mb-5 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">Vous trouvez ici l'ensemble de votre historqiue avec ce Patient</h2>
            <Table historiqueRendezVous={historiqueRendezVous}/>
            {/* <ul role="list" className="space-y-4 text-gray-500 dark:text-gray-400">
                <li className="flex space-x-2 rtl:space-x-reverse items-center">
                    <svg className="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                    </svg>
                    <span className="leading-tight">Dynamic reports and dashboards</span>
                </li>
                <li className="flex space-x-2 rtl:space-x-reverse items-center">
                    <svg className="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                    </svg>
                    <span className="leading-tight">Templates for everyone</span>
                </li>
                <li className="flex space-x-2 rtl:space-x-reverse items-center">
                    <svg className="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                    </svg>
                    <span className="leading-tight">Development workflow</span>
                </li>
                <li className="flex space-x-2 rtl:space-x-reverse items-center">
                    <svg className="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                    </svg>
                    <span className="leading-tight">Limitless business automation</span>
                </li>
            </ul> */}
        </div>
        { params.enCours==="true" &&
        <div className={`${activeTab==="ordonnance" ?  '':'hidden'} p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800`} id="statistics" role="tabpanel" aria-labelledby="statistics-tab">
            <Form  patient={patient} rendezVousId={rendezVousId} medecin={medecin} medicamentsto_choose={medicamentsto_choose}/>
        </div>
        }
     </div>
    </div>
  )
}
export default Details;