import React from 'react'
import { pageTitle }from "../../PageData/PageData"
import "./header.css"
import { useDarkMode } from '../DarkModeProvider/DarkModeProvider'

const Header = () => {

  const {sharedState} = useDarkMode()
 
  return (
    <div className={`${sharedState.darkMode ? "dark-header" : "light-header" } header-card shadow-md  text-center p-4` }>
        <h1 className='text-3xl font-serif '>{pageTitle}</h1>
    </div>
  )
}

export default Header