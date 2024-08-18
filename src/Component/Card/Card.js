import React, { useEffect, useState } from 'react'
import "./Card.css"
import apiRequest from '../../endPoints/apiRequest'
import { API_URL } from '../../PageData/PageData'
import { Link, useNavigate } from 'react-router-dom'
import { useDarkMode } from '../DarkModeProvider/DarkModeProvider'
import PopUp from '../popUp/PopUp'

const Card = () => {
  const {sharedState} = useDarkMode()
  const [items,setItems] = useState('')
  const [isVerified , setVerfied] = useState(false)

  const [isFetched,setFetched] = useState(true)
  const [authorize,setAuthorize] = useState(false)
  const [popupVerify,setPopUpVerify] = useState(false)
  const [editCourseName,setEditCourseName] = useState('')
  const [editCourseDescription,setEditCoursDescription] = useState('')
  
 
  const CardClass = `${sharedState.darkMode ? "dark-card" : "light-card"}`
  const ButtonClass = `${sharedState.darkMode ? "dark-card-button" :"light-card-button"}`

  const navigate = useNavigate()
  const date = new Date()
  
  
  useEffect( () =>{
    const fecthItems = async () =>{
      const response = await apiRequest(API_URL,{
        method:"GET"
      })
 
    if(!response){
      setFetched(false)
    }else{
      setItems(response)
     
    }
    }
   
    fecthItems()
    
  },[])

  useEffect(() =>{
    if(!isFetched){
      navigate("/" ,{state:{fetched:isFetched}})
    }
  })

  const handleEditBtn = (name,description) =>{
    setEditCourseName(name)
    setEditCoursDescription(description)
    setPopUpVerify(false)
     if(isVerified){
      navigate('/edit' , {state:{courseName : name , courseDescription:description}})
     }else{
      setAuthorize(true)
     }
  }
  const handleDeleteBtn = async (taskId) =>{
    
    const userConfrim =  window.confirm("Do You Want to Delete This Task")
    if(userConfrim){
      const updatedList = items.filter(eachItem => eachItem.id !== taskId)
      
          setItems(updatedList)
      
      const reqObj = {
        method:"DELETE",
        header:{
          "Content-Type":"application/json"
        }
      }
      const reqUrl = `${API_URL}/${taskId}`
      await apiRequest(reqUrl,reqObj)
    

    }
  }
  
  return (
    <div className='  container-card  md:w-10/12  pb-32 flex flex-grow flex-col items-center justify-start '>
      { isFetched === true ? ( (items.length) !== 0  ? items.map(
        eachItem  => 
          <div key={eachItem.id} className={` ${CardClass} Content-cards p-2 rounded-lg   w-9/12 md:w-7/12 lg:w-4/12 grid grid-cols-1  ml-9 mr-9 m-3 justify-items-center items-center`}>
              <div className='Content flex flex-col    items-center'>
                <div className='flex items-center justify-center  w-100 '>
                
                  <p className='m-auto text-2xl font-black   font-sans'>{eachItem.title}</p>
                  <p className=' col-start-5 col-end-6'> </p>
                 
                </div>
                <div>
                <p className='col-span-3 mt-2 mb-3 m-auto font-bold '>{eachItem.description}</p>
                  </div> 
                  
              </div>
              <div className='grid grid-cols-5'>
                <div className='col-start-1 col-end-2'>
                {eachItem.access === "admin" 
                  ? 
                    <button 
                        onClick={() => {
                          handleEditBtn(eachItem.title,eachItem.description)
                        }
                          }

                        className={`${ButtonClass} button-element `}
                      >Edit
                      
                    </button> 
                 : <Link to="/edit" state={{editCourseName:eachItem.title , editCourseDescription: eachItem.description }} >
                 
                 <button 
                        onClick={() => {handleEditBtn(eachItem.title,eachItem.description)
                          setVerfied(true)
                        }}
                        className={`${ButtonClass} button-element `}
                  >Edit</button>  
                 
               </Link>}
                   </div>
                <div ><Link to="/card">
                    <button   
                        onClick={(e) => {
                          handleDeleteBtn(eachItem.id)
                          
                        } 
                        }
                        
                        className={`${ButtonClass} button-element`}
                      >Delete </button>
              </Link></div>
                <div className='col-start-5 flex  '><p className=' text-xs m-auto'>{`${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`}</p></div>
            
              </div>
          </div>
        ):<div className='h-44 flex flex-col justify-end'>
          <div className="spinner-border " role="status">
            <span className="visually-hidden"></span>
          </div> 
        </div>
        
        
       ) : <div className='h-screen w-100 border-2 border-pink-500'><p className='text-black text-2xl'>Failed to Fetch</p></div>
     }
     {!popupVerify && authorize && <PopUp setPopUpVerify = {setPopUpVerify} 
       editCourseName ={editCourseName}  
       editCourseDescription = {editCourseDescription}
       />}
      
    </div>
   
   
  )
}

export default Card