import React, { createContext } from 'react';
import { HelmetProvider } from 'react-helmet-async';

export const HelmetContext = createContext();

const HelmetContextProvider = ({ children }) => {
  return (
    <HelmetProvider>
      <HelmetContext.Provider value={{}}>
        {children}
      </HelmetContext.Provider>
    </HelmetProvider>
  );
};

export default HelmetContextProvider;