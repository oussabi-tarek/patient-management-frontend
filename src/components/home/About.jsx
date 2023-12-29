
import Carousel from './Carousel';

const About=()=>{
    return(
        <div id="about" className='flex flex-col p-20'>
            <div className='flex flex-col mb-4 self-center  space-y-4 '>
                <p className='font-serif self-center '>La grande place du centre hospitalier médical</p>
                <p className='font-sans text-sm self-center font-bold text-indigo-700'>
                Nous fournissons des astuces et des conseils spéciaux en matière de soins de santé et de haut niveau de la meilleure technologie impliquée dans notre hôpital.
                </p>
                
            </div>
            <Carousel/>
        </div>
    )
}
export default About;