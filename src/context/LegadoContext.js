import { createContext, useContext, useState } from "react";

const CorreccionContext = createContext({
    isCorreccion: false,
    setIsCorreccion: () => {}
});

export const CorreccionProvider = ({ children }) => {
  const [isCorreccion, setIsCorreccion] = useState(false);

  return (
    <CorreccionContext.Provider value={{ isCorreccion, setIsCorreccion }}>
      {children}
    </CorreccionContext.Provider>
  );
};

export const useCorreccion = () => useContext(CorreccionContext);