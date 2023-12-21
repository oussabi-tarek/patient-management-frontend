import React from "react";
import axios from "axios";
import Card from "./Card";



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
    <div className="flex flex-col ">
        <div className="grid justify-items-center">
        <h1>Votre Rendez-vous En Cours</h1>
        </div>
        <div className='flex flex-wrap'>
        {
            rendezVousEncours.length===0 ? <h1>Vous n'avez pas de rendez vous en cours </h1> :
            <Card rendezVous={rendezVousEncours[0]} enCours={true}/>
        }
        </div>
    </div>
   )
}
export default RendezVousEncours;