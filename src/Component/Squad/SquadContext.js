// SquadContext.js
import React, { createContext, useState } from "react";

const SquadContext = createContext();

const SquadProvider = ({ children }) => {
  const [selectedSquadId, setSelectedSquadId] = useState(null);

  return (
    <SquadContext.Provider value={{ selectedSquadId, setSelectedSquadId }}>
      {children}
    </SquadContext.Provider>
  );
};

export { SquadContext, SquadProvider };
