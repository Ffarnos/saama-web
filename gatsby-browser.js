
import React from 'react';
import {FirebaseProvider} from "./src/components/FirebaseContext";
import { RamificacionProvider } from "./src/context/RamificacionContext";
import { CorreccionProvider } from "./src/context/LegadoContext";


export const wrapRootElement = ({ element }) => {
  return (
      <FirebaseProvider>
        <RamificacionProvider>
         <CorreccionProvider>
          {element}
        </CorreccionProvider>
       </RamificacionProvider>
    </FirebaseProvider>
  );
};

export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
      `La aplicacion se ha actualizado ` +
      `Necesitas recargarla para no perderte los nuevos cambios`
  )

  if (answer === true) {
    window.location.reload()
  }
}





