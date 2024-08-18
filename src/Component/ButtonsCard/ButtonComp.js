import React, { useState ,useEffect } from 'react'

import { Link , useLocation } from 'react-router-dom'
import apiRequest from '../../endPoints/apiRequest'
import { API_URL } from '../../PageData/PageData'
import { useDarkMode } from '../DarkModeProvider/DarkModeProvider'


const ButtonComp = () => {
  const { sharedState } = useDarkMode();
  
 
  const [items,setItems] = useState([])
  const location = useLocation()
  
  
  const handleShowButton =() =>{
    return 
  }

  useEffect( () =>{
    const fecthItems = async () =>{
    const response = await apiRequest(API_URL,{
      method:"GET"
    })
    setItems(response)

  }
   
    fecthItems()
  
   
  },[])

  
  let ButtonClassName = `${sharedState.darkMode ? "dark-button" :"light-button"}`
  

  return (
    
    <div className=' flex gap-2 items-end justify-end pr-7 mt-3'>
        {location.pathname === "/card" ?
          (<div className='flex gap-3'> 
            <Link to="/edit" state={{courseName : '' , courseDescription:''}}>
              <button className={`${ButtonClassName} button-element`} >EDIT</button>
            </Link>
            <Link to="/add" state={items} >
              <button className={`${ButtonClassName} button-element`}>ADD</button>
            </Link>
          
          </div> ) :  
            (<Link to="/card">
              <button 
                className={`${ButtonClassName} button-element mb-1`}
                onClick={handleShowButton} >Show All Task
              </button>
            </Link>) 
        }
       
        
    </div>
  )
}

export default ButtonComp