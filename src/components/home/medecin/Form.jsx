import CheckBox from './CheckBox';
import {useState} from 'react';
import List from './List';

function Form(){
   const [medicaments,setMedicaments]=useState([]);
   const [medicament,setMedicament]=useState('');
   const [nbrPrise,setNbrPrise]=useState('');
   const onAddMedicamentAndNbrPrise=()=>{
    if(medicament!==""){
         const nvMedicament={
            med:medicament,
            prise:nbrPrise
         }
         console.log(nvMedicament);
        setMedicaments([...medicaments,nvMedicament]);
        setMedicament('');
        setNbrPrise('');
    }
   } 
   const onAddMedicament=(e)=>{
    setMedicament(e.target.value);
   }
   const onAddNbrPrise=(e)=>{
      setNbrPrise(e.target.value);
   }
    const onDeleteMedicament = (medicament) => {
        medicaments.map((med,index)=>{
          if(med.med === medicament.med && med.prise === medicament.prise){
            medicaments.splice(index,1);
            setMedicaments([...medicaments]);
          }
        })
    }
  return(
    <form className="max-w-sm mx-auto">
    <div className="mb-5">  
        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
        <select id="countries" value={medicament}
        onChange={onAddMedicament}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option value="">Choisir Medicament</option>
        <option value="Medicament1">Medicament1</option>
        <option value="Medicament2">Medicament2</option>
        <option value="Medicament3">Medicament3</option>
        <option value="Medicament4">Medicament4</option>
        </select>
    </div>
    <div className="mb-5">
        <label htmlFor="nbr_prise" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre de prise</label>
        <input type="number" onChange={onAddNbrPrise} value={nbrPrise} id="nbr_prise" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
    </div>
    <button type="button" onClick={onAddMedicamentAndNbrPrise} className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs w-full sm:w-auto px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Ajouter</button>
    <List medicaments={medicaments} onDeleteMedicament={onDeleteMedicament}/> 
     <div className='mb-6 mt-6'>
            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Liste des analyses</h3>
            <CheckBox/>
     </div>

    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Generer</button>
    </form>
  )
}
export default Form;