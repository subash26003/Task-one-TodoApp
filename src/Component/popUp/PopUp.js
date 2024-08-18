import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDarkMode } from '../DarkModeProvider/DarkModeProvider'
import "./popUp.css"

const PopUp = ({setPopUpVerify , editCourseName ,editCourseDescription}) => {
    
    const Navigate = useNavigate()
    const { sharedState} = useDarkMode()

    const PopUpClass = sharedState.darkMode ? 'dark-popup' : 'light-popup'
    const ButtonClass = sharedState.darkMode ? 'dark-popup-button' : 'light-popup-button'

    const handleBackBtn = () =>{
        Navigate("/card")
        setPopUpVerify(true)
    }

    const handleVerifyBtn = () =>{
        Navigate("/verify" ,{state:{editCourseName:editCourseName , editCourseDescription:editCourseDescription}})
    }
    

  return (
    <div >
        <div className='pop-up-top-card fixed top-0 left-0 h-screen w-screen  flex justify-center items-center '>
            <div className={`${PopUpClass} pop-inner-card w-5/12 flex flex-col items-center justify-center shadow-2xl  p-10 gap-3 rounded-lg`}>
                <p className='text-2xl font-bold text-center '> Your are not Allowed </p>
                <div className=''>
                    <button className={`${ButtonClass} button-element mr-1`}
                     onClick={() => handleBackBtn()}
                    >Back</button>
                    <button className={`${ButtonClass} button-element ml-1`} 
                     onClick={ () => handleVerifyBtn()}
                    >Verify</button>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default PopUp