import React from 'react'
import "./footer.css"
import { useDarkMode } from '../DarkModeProvider/DarkModeProvider'


const Footer = () => {
  const {sharedState} = useDarkMode()
  let FootClass  = `${ sharedState.darkMode ? "dark-footer" : "light-footer"}`

   let d = new Date() 
   let date = `${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`
  return (
    <div className={`${FootClass}  footer-card text-center  w-full  font-serif p-2 shadow-2xl shadow-white`} >
      
      <p >Terms & Conditions</p>
      <p>  {date} </p>
    </div>
  )
}

export default Footer