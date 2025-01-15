import React, { createContext, useState, useContext } from 'react';

const ExcalidrawAPIContext = createContext(null);

export const ExcalidrawAPIProvider = ({ children }) => {
  const [excalidrawAPI, setExcalidrawAPI] = useState(null);

  return (
    <ExcalidrawAPIContext.Provider value={{ excalidrawAPI, setExcalidrawAPI }}>
      {children}
    </ExcalidrawAPIContext.Provider>
  );
};

export const useExcalidrawAPI = () => {
  const context = useContext(ExcalidrawAPIContext);
  if (!context) {
    throw new Error('useExcalidrawAPI must be used within an ExcalidrawAPIProvider');
  }
  return context;
};
