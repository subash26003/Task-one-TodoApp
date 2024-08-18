
import React, { createContext, useState, useContext } from 'react';

const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
    const  [sharedState, setSharedState] = useState({ darkMode: false });
  return (
    <DarkModeContext.Provider value={{ sharedState, setSharedState }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => useContext(DarkModeContext);
