
import {API_URL} from "../../PageData/PageData"
import { useState ,useEffect } from 'react'
import "./addCard.css"
import apiRequest from '../../endPoints/apiRequest'
import {  useNavigate } from 'react-router-dom'
import { useDarkMode } from "../DarkModeProvider/DarkModeProvider"


const AddTask = () => {
    
    const [newTaskName, setnewTask] = useState('')
    const [newDescription, setNewDescription] = useState('')
    const navigate = useNavigate()
   
    const [isAdd , setAdd] = useState(true)
    const [prevId,setPrevId] = useState(null)

    const [allTask,setAllTask] = useState([])
    const {sharedState} = useDarkMode()
    const ButtonClass = `${sharedState.darkMode ? "dark-card-button" : 'light-button'}`
  
    
    useEffect( () => {
      const fecthItems = async () =>{
        const response = await apiRequest(API_URL,{
          method:"GET"
        })
        setAllTask(response)
        }
        fecthItems()
    },[isAdd])

    const handleAddBtn =async () =>{
     
       if( !newTaskName ){
        alert("Enter the New Course Name ") 
      }else{
        const newId =  prevId === null ? (allTask.length !== 0 ? Number(allTask[allTask.length - 1].id) : 0 ): prevId
        setPrevId(newId + 1)
        const newTask = {
            id: String(newId + 1) ,
            title:newTaskName,
            description:newDescription
        }
        
   
        localStorage.setItem("taskList",JSON.stringify(allTask))
        const optionObj = {
          method : "POST",
          headers:{
            "content-type":"application/json"
          },
          body:JSON.stringify(newTask)
      }
      console.log(allTask)
     
      
     
       apiRequest(API_URL,optionObj)
      setnewTask('')
      setNewDescription('')
      } 
    }
  
    const handleBackBtn = () =>{
      navigate("/card")
    }
    
   
  
    return (
      <div className=' h-screen bg-slate-700 flex flex-col items-center justify-center' >
          <div className='add-card bg-transparent shadow-lg shadow-slate-500 w-11/12 md:w-7/12 lg:w-5/12 rounded-3xl bg-white p-3 flex flex-col border-2 border-gray-800  items-end m-3 '>
            <button name ={"back"} className={`${ButtonClass} button-element`} onClick={() => handleBackBtn()}>Back</button>
              <form className='w-10/12 mb-11  flex flex-col justify-center gap-1' onSubmit={(e) => e.preventDefault()}>
                    <p  className='mt-9 mb-2 text-2xl font-bold'>ADD NEW TASK</p>
                    <label htmlFor='courseInputId'>Task Name</label>
                    <input type="text" 
                    className='w-5/12 p-2  border-1 border-gray-400 rounded-lg  focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400'
                    id="courseInputId"
                    value={newTaskName || ''}
                    onChange={(e) => setnewTask(e.target.value)}
                    />
                    <label htmlFor='desInputId'>Task Description </label>
                    <input type="text" 
                    className='w-5/12 p-2  border-1 border-gray-400 rounded-lg  focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400'
                    id="desInputId"
                    value={newDescription || ''}
                    onChange={(e) => setNewDescription(e.target.value)}
                    />
                    <button name = {"Add"} 
                    onClick= {(e) => {
                      handleAddBtn()
                      setAdd(!isAdd)
                      }}
                       className={`${ButtonClass} button-element w-20`}
                       >Add</button>
              </form>
          </div>
      </div>
    )
}

export default AddTask