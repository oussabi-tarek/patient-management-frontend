import React from 'react';
import Navbar from './Navbar';
import DOCTOR from '../../assets/doctor.png';
import Footer from './Footer';
import Services from './Services';
import About from './About';
const Home=(props)=>{
    return(
        <div>
            <Navbar setIsAuth={props.setIsAuth} />
            <div className='flex  p-20 w-full justify-between'>
                <div className='flex flex-col  self-center  space-y-4 ml-12'>
                   <p className='font-serif'>Nous fournissons toutes les solutions de soins de santé</p>
                   <p className='font-sans text-2xl font-bold text-indigo-700'>&nbsp;Protégez votre santé et prenez soin de votre santé</p>
                </div>
                <div className='flex mr-16'>
                    <img className='h-80 w-50 image-animation' src={DOCTOR} alt='health'/>
                </div>
            </div>
            <About/>
            <Services/>
            <Footer/>
        </div>
    )
}
export default Home;