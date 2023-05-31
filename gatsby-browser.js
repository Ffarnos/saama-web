import React from 'react';
import { useConfigureInstall } from './src/components/UseInstall';
import ReactDOM from "react-dom";

const ConfigureInstall = () => {
  useConfigureInstall();

  // Puedes devolver nulo o cualquier otro componente, ya que esto solo se ejecutará una vez durante la carga del cliente
  return null;
};

export const onClientEntry = () => {
  // Renderiza el componente ConfigureInstall en el punto de entrada del cliente
  // Esto permitirá que el hook useConfigureInstall se ejecute
  const root = document.createElement('div');
  root.id = 'configure-install-root';
  document.body.appendChild(root);
  ReactDOM.render(<ConfigureInstall />, root);
};

export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
      "Se ha actualizado la aplicación. ¿Deseas recargar la página para ver la última versión?"
  );

  if (answer === true) {
    window.location.reload();
  }
};