import React, {  useState } from "react";
import "./homePage.css"
import Header from '../../Component/Header/Header'
import ButtonComp from '../../Component/ButtonsCard/ButtonComp';
import Footer from "../../Component/Footer/Footer"
import {  Outlet, useLocation } from "react-router-dom";
import { useDarkMode } from "../../Component/DarkModeProvider/DarkModeProvider"
const HomePage = () => {
  const { sharedState, setSharedState } = useDarkMode();
  const [dark,setDark] = useState(sharedState.darkMode)
  const location = useLocation()
  const {fetched} = location.state || {fetched : true}
  const handleDark = () =>{
    setSharedState({darkMode : !sharedState.darkMode})
   
  }
  let ButtonClassName = `${dark ? "dark-button" :"light-button"}`
  let BackgroundClass = `${dark ? "dark-mode" : "light-mode"}`
  let ContentClass = `${dark ? 'dark-content' : 'light-content'}`
  return (
    <div className={`${BackgroundClass}   min-h-screen fixed inset-0 overflow-auto`}>
        <Header/>
          <div >
             <div >
              <div className=" pl-10 mt-10 md:mt-10 lg:mt-14 lg:w-3/6 md:w-4/6 md:m-auto">
                {dark ? <button className={`${ButtonClassName} button-element `}
                  onClick={() => {
                    handleDark()
                    setDark(!dark)}}
                  >Light</button> 
                  : <button className={`${ButtonClassName} button-element `}
                  onClick={() => {
                    handleDark()
                    setDark(!dark)}}
                  >Dark</button>}
              </div>
              
              <div className=" md:flex md:flex-col md:items-center  overflow-hidden">
                <div className=" md:w-4/12 pr-5">
                <ButtonComp />
                </div>
                <Outlet />
                {!fetched && <div className="w-100 h-60 flex flex-col items-center justify-center">
                  <span className={`${ContentClass} text-center font-black text-xl` } >Failed to Fetch <br/> Check the Connection</span>
                  </div>}
              </div>
              </div>
          </div>
          
        <Footer />   
    </div>
  )
}
export default HomePage