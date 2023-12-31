import PROFILE from '../../../assets/profile.png';



function Card(props){
    const dateTime = new Date(props.rendezVous.date);
    const formattedTime = dateTime.toLocaleTimeString();

    return(
    <div className="w-full h-80 max-w-sm bg-white border border-gray-200 m-4 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="hidden flex justify-end px-4 pt-4">
            <button id="dropdownButton" data-dropdown-toggle="dropdown" className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
                <span className="sr-only">Open dropdown</span>
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                </svg>
            </button>
            <div id="dropdown" className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                <ul className="py-2" aria-labelledby="dropdownButton">
                <li>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Edit</a>
                </li>
                <li>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Export Data</a>
                </li>
                <li>
                    <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
                </li>
                </ul>
            </div>
        </div>
        <div className="flex flex-col items-center pb-10 p-4">
            <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={PROFILE} alt="Bonnie image"/>
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{props.rendezVous.patient.nom} {props.rendezVous.patient.prenom}</h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">Cause: {props.rendezVous.cause}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">Type: {props.rendezVous.type}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">Heure: {formattedTime}</span>
            <div className="flex mt-4 md:mt-6">
                <a href={ props.enCours===false ? `/details/${props.rendezVous.patient._id}/${props.rendezVous._id}/${false}`
                :`/details/${props.rendezVous.patient._id}/${props.rendezVous._id}/${true}`} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Consulter les details</a>
                <a href="/chat" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 ms-3">Message</a>
            </div>
        </div>
    </div>
    )
}
export default Card;