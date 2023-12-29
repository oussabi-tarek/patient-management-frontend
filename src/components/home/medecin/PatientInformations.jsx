import PROFILE from '../../../assets/profile.png';
import { differenceInYears, parseISO } from 'date-fns';

function PatientInformations(props){
   // console.log(props.patient);
    const getAge = (dateString) => {
          // Parse la date de naissance au format ISO
        if(dateString!==undefined){
        const birthDate = parseISO(dateString);
        // Calcule la différence en années entre la date actuelle et la date de naissance
        const age = differenceInYears(new Date(), birthDate);
        return age;
        }
    }
    return(
    <div  className="flex flex-col items-center  text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm  dark:text-gray-400 dark:bg-gray-800 dark:border-gray-600">
       <div className="p-3 flex flex-col items-center">
        <div className="flex items-center justify-between mb-2">
            <a href="#">
                <img className="w-14 h-14 rounded-full" src={props.patient.image} alt="Jese Leos" />
            </a>
            
            {/* <div>
                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Follow</button>
            </div> */}
        </div>
        <p className="text-base font-semibold leading-none text-gray-900 dark:text-white">
            <a href="#">{props.patient.nom} {props.patient.prenom}</a>
        </p>
        <p className="mb-3 text-sm font-normal">
            <a href="#" className="hover:underline">@{props.patient.nom}</a>
        </p>
        {/* <p className="mb-4 text-sm">Open-source contributor. Building <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline">flowbite.com</a>.</p> */}
        <ul className="flex flex-col  space-y-2 text-sm ">
            <li className="me-2">
                <a href="#" className="hover:underline">
                    <span className="font-semibold text-gray-900 dark:text-white">Sexe: </span>
                    <span>{props.patient.sexe}</span>
                </a>
            </li>
            <li>
                <a href="#" className="hover:underline">
                    <span className="font-semibold text-gray-900 dark:text-white">Addresse: </span>
                    <span>{props.patient.adresse}</span>
                </a>
            </li>
            <li>
                <a href="#" className="hover:underline">
                    <span className="font-semibold text-gray-900 dark:text-white">Age: </span>
                    <span>{getAge(props.patient.date_naissance)} ans</span>
                </a>
            </li>
            <li>
                <a href="#" className="hover:underline">
                    <span className="font-semibold text-gray-900 dark:text-white">Telephone: </span>
                    <span>{props.patient.telephone}</span>
                </a>
            </li>
            <li>
                <a href="#" className="hover:underline">
                    <span className="font-semibold text-gray-900 dark:text-white">Numero Cnss: </span>
                    <span>{props.patient.numero_cnss}</span>
                </a>
            </li>
            <li>
                <a href="#" className="hover:underline">
                    <span className="font-semibold text-gray-900 dark:text-white">Nombre de Medecins: </span>
                    <span>{props.patient.medecins && props.patient.medecins.length}</span>
                </a>
            </li>
        </ul>
    </div>
    <div data-popper-arrow></div>
   </div>
    )
}
export default PatientInformations;