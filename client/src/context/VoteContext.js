// VoteContext.js
import React, { createContext, useState } from 'react';

export const VoteContext = createContext();

export const VoteProvider = ({ children }) => {
  const [arrayValue, setArrayValue] = useState(null);

  return (
    <VoteContext.Provider value={{ arrayValue, setArrayValue }}>
      {children}
    </VoteContext.Provider>
  );
};