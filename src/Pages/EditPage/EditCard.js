import React from 'react'
import "./EditCard.css"
import {API_URL} from "../../PageData/PageData"  // url for api request 
import { useState ,useEffect } from 'react'
import apiRequest from '../../endPoints/apiRequest'  // function for perform HTTP requests
import {  useLocation, useNavigate } from 'react-router-dom'
import { useDarkMode } from '../../Component/DarkModeProvider/DarkModeProvider'  // using Context for provide Dark mode

const EditCard = () => {
  const { sharedState } = useDarkMode()   // acces the Dark mode state i.e (true or false)
  const [taskName ,setTaskName]= useState('')   // selected task for edit
  const [newTaskName, setNewTaskName] = useState('')  // New task entered 
  const [newTaskDescription, setNewTaskDescription] = useState('') // new description Entered
  const navigate = useNavigate()   // to perform navigate functions 
  const [items,setItems] = useState([])  // items that are already present
  
  const ButtonClass = `${ sharedState.darkMode ? 'dark-card-button' :'light-button'}`  // button class for dark/light mode
  const location = useLocation()  // to track the path and to share data using state object
  


  useEffect( () =>{    
    const fecthItems = async () =>{    // function to get data from the data/db.json folder
    const response = await apiRequest(API_URL,{
      method:"GET"
    })
    setItems(response)
  }
  
    fecthItems()
  },[])

  useEffect (() =>{     // set the name of the edit task and description in the input value
    if(location.state){
      setTaskName(location.state.editCourseName)
      setNewTaskName(location.state.editCourseName)
      setNewTaskDescription(location.state.editCourseDescription)
    }
  },[location])
  
  const handleSubmitBtn = async () =>{  // to handle the submit button 
    if(!taskName  ){
      alert("Select the Course to Edit ") 
    }else if( !newTaskName ){
      alert("Enter the New COurse Name ") 
    }else{
      const index = items.findIndex(eachItem => {   // get the index of edited task
        if(eachItem.title === taskName){
          return true
        }else{
          return false
        }
      })
      
    const optionObj = {   // create a request object for edit / patch the task
        method : "PATCH",
        stateObjers:{
          "content-type":"application/json"
        },
        body:JSON.stringify({title:newTaskName ,  
          description : newTaskDescription 
        })   
    }
    
    let reqUrl =  `${API_URL}/${items[index].id}`  // passing the URL with task id to get the partticular task for edit
  
    
    await apiRequest(reqUrl,optionObj)
    // set the select and input element with empty string after submission
    setTaskName('')   
    setNewTaskName('')
    setNewTaskDescription('')

    } 
  }

  const handleBackBtn = () =>{   // if back btn clicked , go to card page
    navigate("/card")
  }
  
  // if the task is selected for edit, set the default value of those input with the edit task name and description
  const handleSelectChange = (selectedCourse) =>{    
      let selectedTask = items.findIndex(each => {  // find the index of selected task 
        if(each.title === selectedCourse){
          return true
        }else{
          return false
        }})
       // set the name and description of the task to the default value of the New task and New desscription input element  
      setNewTaskName(items[selectedTask].title)  
      setNewTaskDescription(items[selectedTask].description)
      
  }

 

  return (
    // outer container in edit page 
    <div className='edit-card h-screen bg-slate-700 flex flex-col items-center justify-center' > 
        <div className={`bg-transparent shadow-lg shadow-slate-500 w-11/12 md:w-7/12 lg:w-5/12 rounded-3xl p-3 flex flex-col border-2 border-gray-800  items-end m-3 `}>
          <button name ={"back"}  onClick={() => handleBackBtn()} className={`${ButtonClass} button-element`}>Back</button>
            <form className='w-10/12 mb-11 flex flex-col justify-center gap-1' onSubmit={(e) => e.preventDefault()}>
                <label htmlFor='courseId' className=''>Select Cousre to Edit</label>
                <select
                id="courseId" 
                value ={taskName}
                onChange={(e) =>  { 
                  setTaskName(e.target.value) 
                  handleSelectChange(e.target.value)
                } }
                className='w-5/12 p-2 pr-3 rounded  border-x-4 border-y-4 border-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300'>
                  <option value='' ></option>
                { items.map (eachItem => 
                  <option value={eachItem.title} key={eachItem.id}>{eachItem.title}</option>
                ) }
                  </select>
                  <p  className='mt-9 mb-2 text-2xl font-bold'>Edit Card Details</p>
                  <label htmlFor='courseInputId'>Course Name</label>
                  <input type="text" 
                  className='w-5/12 p-2  border-1 border-gray-400 rounded-lg  focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400'
                  id="courseInputId"
                  value={newTaskName }
                  onChange={(e) => setNewTaskName(e.target.value)}
                  />
                  <label htmlFor='desInputId'>Course Description </label>
                  <input type="text" 
                  className='w-5/12 p-2  border-1 border-gray-400 rounded-lg  focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400'
                  id="desInputId"
                  value={ newTaskDescription }
                  onChange={(e) => setNewTaskDescription(e.target.value)}
                  />
                  <button 
                  onClick= {handleSubmitBtn} 
                  className={`${ButtonClass} button-element mr-auto`}> Submit </button>
            </form>
        </div>
    </div>
  )
}

export default EditCard