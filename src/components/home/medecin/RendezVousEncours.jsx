import React from "react";
import DOCTOR from "../../../assets/doctor.png";

function RendezVousEncours(){
   return(
    <div>
            <div className='flex  p-20 w-full justify-between'>
                <div className='flex flex-col  self-center  space-y-4 ml-12'>
                   <p className='font-serif'>rendez vous en cours</p>
                   <p className='font-sans text-2xl font-bold text-indigo-700'>&nbsp;Protégez votre santé et prenez soin de votre santé</p>
                </div>
                <div className='flex mr-16'>
                    <img className='h-80 w-50 image-animation' src={DOCTOR} alt='health'/>
                </div>
            </div>
        </div>
   )
}
export default RendezVousEncours;