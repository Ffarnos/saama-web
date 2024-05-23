
import React from 'react';
import {FirebaseProvider} from "./src/components/FirebaseContext";


export const wrapRootElement = ({ element }) => {
  return (
      <FirebaseProvider>
        {element}
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





