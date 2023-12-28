import React from 'react';
import NavbarMedecin from './NavbarMedecin';
import Footer from '../Footer';
import { useState } from 'react';
import Home from '../Home';
import RendezVousEncours from './RendezVousEncours';
import RendezVousAvenir from './RendezVousAvenir';


function HomeMedecin(props){
    const [navbarClick,setNavBarClick]=useState("rendez-vous en cours");
        if(navbarClick==="home"){
            return(
                <Home/>
              )
        }
        else{
           return(
            <div className='flex flex-col'>
            <NavbarMedecin setIsAuth={props.setIsAuth} setNavBarClick={setNavBarClick} />
             {
                navbarClick==="rendez-vous en cours" ? <RendezVousEncours/> : <RendezVousAvenir/> 
             }
            <Footer/>
            </div>
           )
        }
}
export default HomeMedecin;