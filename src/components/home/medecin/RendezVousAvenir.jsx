import React from "react";
import Card from "./Card";
import axios from "axios";

function RendezVousAvenir(){
    const [rendezVousAvenir,setRendezVousAvenir]=React.useState([]);
    React.useEffect(()=>{
        axios
      .get("http://localhost:8080/appointments/doctor", { 
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
    },[])

    return(
        <div className="flex flex-col">
            <h1>Rendez vous a venir</h1>
            <div className='flex flex-wrap'>
                <Card/>            
            {
                rendezVousAvenir.map((rendezVousAvenir)=>{
                    return(
                        <Card rendezVous={rendezVousAvenir}/>
                    )
                })
            }
            </div>
        </div>
    )
}
export default RendezVousAvenir;