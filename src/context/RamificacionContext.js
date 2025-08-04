import { createContext, useContext, useState } from "react";

const RamificacionContext = createContext();

export const RamificacionProvider = ({ children }) => {
  const [isRamificando, setIsRamificando] = useState(false);

  return (
    <RamificacionContext.Provider value={{ isRamificando, setIsRamificando }}>
      {children}
    </RamificacionContext.Provider>
  );
};

export const useRamificacion = () => useContext(RamificacionContext);