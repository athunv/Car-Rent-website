import React, { useState, createContext } from 'react';

export const addCarContextData = createContext();

function CarContextProvider({ children }) {
  const [addCarContext, setAddCarContext] = useState("");

  return (
    <addCarContextData.Provider value={{ addCarContext, setAddCarContext }}>
      {children}
    </addCarContextData.Provider>
  );
}

export default CarContextProvider;
