import React from "react";
import Card from "./Card";
import axios from "axios";
import { useState } from 'react';
import Calendar from './Calendar';

// TODO: fix the datepicker style
function RendezVousAvenir(){
    const [rendezVousAvenir,setRendezVousAvenir]=React.useState([]);
    const [value, onChange] = useState(new Date());

    React.useEffect(()=>{
        const dateday = new Date();
        console.log(value);
        axios
      .get("http://localhost:8080/appointments/doctor/date="+value,{ 
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
       })
      .then((r) => {
        setRendezVousAvenir(r.data);
          console.log(r.data);
      })
      .catch((e) => {
         console.log("Auth Error", e)
      });
    },[value])

    return(
        <div className="flex flex-col ">
            <div className="grid justify-items-center">
            <h1>Rendez vous a venir</h1>
            <div className="z-150 mt-5">
            <Calendar onChange={onChange} value={value} />
            </div>
            </div>
            <div className='flex flex-wrap'>
            {
                rendezVousAvenir.length===0 ? <h1>Vous n'avez pas de rendez vous a venir correspond a cette date </h1> :
                rendezVousAvenir.map((rendezVousAvenir)=>{
                    return(
                        <Card key={rendezVousAvenir._id} rendezVous={rendezVousAvenir} enCours={false}/>
                    )
                })
            }
            </div>
        </div>
    )
}
export default RendezVousAvenir;