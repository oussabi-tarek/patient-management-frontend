import React from "react";
import axios from "axios";
import Card from "./Card";
import "./styles_en_cours.css";

function RendezVousEncours(props){
    const [rendezVousEncours,setRendezVousEncours]=React.useState([]);
    React.useEffect(()=>{
        axios
      .get("http://localhost:8080/appointments/current/doctor",{ 
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
       })
      .then((r) => {
        setRendezVousEncours(r.data);
          console.log(r.data);
      })
      .catch((e) => {
         console.log("Auth Error", e)
      });
    },[])
   return(
    <div className="flex flex-col mt-2">
        <div className="grid justify-items-center">
        <h1>Votre Rendez-vous En Cours</h1>
        </div>
        <div id="list_rendez-vous_en_cours" className='flex flex-wrap'>
        {
            rendezVousEncours.length===0 ? <h1 className="h-100 ml-4 mt-6">Vous n'avez pas de rendez vous en cours! </h1> :
            <Card rendezVous={rendezVousEncours[0]} enCours={true}/>
        }
        </div>
    </div>
   )
}
export default RendezVousEncours;