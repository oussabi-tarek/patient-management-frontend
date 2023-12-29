import React from 'react';
import Card from './Card';
import CARDIOLOGIE from '../../assets/cardiologie.jpg';
import RHUMATOLOGIE from '../../assets/rhumatologie.jpg';
import ENDOCRINOLOGIE from '../../assets/endocrinologie.png';

const Services=()=>{
    return(
        <div id="services" className='flex p-20'>
            <div className='flex flex-col space-y-3 self-center'>
                <p className='font-serif'>Nous couvrons une grande variété de services médicaux</p>
                <p className='font-sans text-md font-bold text-indigo-700'>&nbsp;Nous fournissons des astuces et des conseils spéciaux en matière de soins de santé et de haut niveau de qualité.</p>
            </div>
            <div className='flex flex-row '>
            <Card
                title="Cardiologie"
                image={CARDIOLOGIE}
                description="La cardiologie est la branche de la médecine qui se consacre à l'étude, au diagnostic et au traitement des affections liées au cœur et au système cardiovasculaire."
                link="/doctors/cardiologie"
            />  
            <Card
                title="Endocrinologie"
                image={ENDOCRINOLOGIE}
                description="L'endocrinologie est la spécialité médicale qui se concentre sur l'étude des glandes endocrines, des hormones qu'elles produisent, et de leurs effets sur la régulation des fonctions corporelles."
                link="/doctors/endocrinologie"
            />    
            <Card
                title="Rhumatologie"
                image={RHUMATOLOGIE}
                description="La rhumatologie est la discipline médicale dédiée à l'étude, au diagnostic et au traitement des affections touchant les articulations, les muscles, les os et les tissus conjonctifs."
                link="/doctors/rhumatologie"
            />              
            </div>
        </div>
    )
}
export default Services;