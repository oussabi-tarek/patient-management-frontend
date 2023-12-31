
function CheckBox(props){
  return(
    <div className="flex flex-col">
    <p>{props.analyse.type}</p>
    {
      props.analyse.analyses.map((analyse,index)=>{
            return(
          <div key={index} className="flex flex-row items-center w-40 ">
              <input id="inline-checkbox" type="checkbox" onChange={(e)=>props.onAnalyseChoose(e)} value={analyse} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label htmlFor="inline-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{analyse}</label>
          </div>
            )
      })
    }
 </div>
  )
}
export default CheckBox;