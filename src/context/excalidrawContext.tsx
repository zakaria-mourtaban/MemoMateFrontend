import React, { createContext, useContext, useState } from "react";

const ExcalidrawAPIContext = createContext(undefined);

export const ExcalidrawAPIProvider = ({ children }) => {
  const [excalidrawAPI, setExcalidrawAPI] = useState(null);

  return (
    <ExcalidrawAPIContext.Provider value={[excalidrawAPI, setExcalidrawAPI]}>
      {children}
    </ExcalidrawAPIContext.Provider>
  );
};

export const useExcalidrawAPI = () => {
  const context = useContext(ExcalidrawAPIContext);
  if (!context) {
    throw new Error(
      "useExcalidrawAPI must be used within an ExcalidrawAPIProvider"
    );
  }
  return context;
};
