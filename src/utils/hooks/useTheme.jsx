// useTheme.js
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeProviderContext';


const useTheme = () => {
  // Use the context to get the theme information
  const ThemeMode = useContext(ThemeContext);

  return ThemeMode;
};

export default useTheme