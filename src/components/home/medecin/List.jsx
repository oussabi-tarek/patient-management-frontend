
function List(props){
  const onDeleteMedicament = (medicament) => {
     props.onDeleteMedicament(medicament);
  }
  return(
   <div className="mt-3">
    <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Liste des Medicaments</h3>
    <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
        { props.medicaments.length>0 && 
        props.medicaments.map((medicament,index)=>{
         return(
            <li key={index} className="flex items-center">
            <svg className="w-3.5 h-3.5 me-2 text-blue-600 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
            </svg>
             {medicament.med} - {medicament.prise}fois &nbsp;&nbsp;&nbsp;
            <button type="button" onClick={()=>onDeleteMedicament(medicament)}>
            <svg className="w-3.5 mt-1 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0"  viewBox="0 0 48 48" version="1" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 48 48">
              <rect x="8" y="21" fill="#FF0000" width="32" height="6"/>
              </svg>
            </button> 
            </li>
         )
        })
         }
    </ul>
   </div> 
  )
}
export default List;