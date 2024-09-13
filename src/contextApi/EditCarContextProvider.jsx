import React, { useState, createContext } from 'react';

export const editCarContextData = createContext();

function EditCarContextProvider({ children }) {
  const [editCarContext, setEditCarContext] = useState("");

  return (
    <editCarContextData.Provider value={{ editCarContext, setEditCarContext }}>
      {children}
    </editCarContextData.Provider>
  );
}

export default EditCarContextProvider;
