import React, { useState } from 'react';
import './adminVerification.css'; 
import { useLocation,useNavigate } from 'react-router-dom';
import { useDarkMode } from '../DarkModeProvider/DarkModeProvider';
import ADMIN_DATA from '../../Admin_data/ADMIN_DATA.json'

const AdminVerification = () => {
  const [name , setName] = useState('')
  const [password , setPassword] = useState('')

  const location = useLocation()
  const navigate = useNavigate()
  
  const ADMIN_NAME = ADMIN_DATA.admin.name
  const ADMIN_PASSWORD = ADMIN_DATA.admin.password
  
  const {editCourseName ,editCourseDescription  } = location.state || {}
  const {sharedState} = useDarkMode()
  
  const ButtonClass = sharedState.darkMode ? 'dark-card-button' : 'light-button'
  

  const handleVerifyBtn = () =>{
    if( name === ADMIN_NAME && password === ADMIN_PASSWORD ){
      navigate("/edit" ,{state:{editCourseName:editCourseName , editCourseDescription:editCourseDescription}})
    }else{
      alert(" Invalid UserName & Password ")
    }
    
  }

  const handleClosebtn =() =>{
    navigate("/card",{state:{userVerified:false}})
  }

  return (
    
        <div className="verification-overlay h-5/6 flex flex-col justify-center items-center   w-screen lg:w-5/12 ">
            <div className="verification-popup border-2 border-black w-3/6 h-2/6 p-2 flex flex-col items-center rounded-3xl shadow-2xl bg-white">
                    <p className={`text-black text-2xl font-black mb-10`}>Admin Verification</p>
                    <div className='flex flex-col justify-center items-center gap-3 mb-4'>
                        <input 
                            onChange={ (e) => setName(e.target.value)}
                            placeholder='Name'
                            className='border-2 p-2 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-lg focus:shadow-blue-950'
                            ></input>
                            <input 
                            onChange={ (e) => setPassword(e.target.value)}
                            placeholder='Password'
                            className='border-2 p-2 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-lg focus:shadow-blue-950'
                            >
                        </input>
                    </div>
                <div className='flex gap-2'>
                <button onClick={() => handleVerifyBtn()}  className={`${ButtonClass} button-element`}>Verify</button>
                <button onClick={() => handleClosebtn()}  className={`${ButtonClass} button-element`}>Close</button>
                </div>
                
            </div>
        </div>
  );
};

export default AdminVerification;