import { createContext, useState } from "react";

export const ThemeContext = createContext(null);
const ThemeProviderContext = ({children}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [modalOpen, setModalOpen ] = useState(false);
  const themeMode ={
    isDarkMode, setIsDarkMode,
    modalOpen, setModalOpen 
  }
  return (
    <ThemeContext.Provider value={ themeMode}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProviderContext;