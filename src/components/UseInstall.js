// noinspection JSUnresolvedVariable
import {useEffect, useState} from 'react';

let deferredPrompt = undefined;

export const ConfigureInstall = () => {
  if (typeof window !== 'undefined') {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
    });
  }
};

const useInstall = () => {
  const [, update] = useState();
  useEffect(() => {
    // Este if es para evitar un error con el SSR, ya que window es 'undefined' y peta el CI
    if (typeof window !== 'undefined') {
      // Instala el listener para el A2HS
      let listener;
      listener = window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        // Guardalo en un Hook para asi re-renderizar el componente ahora que ya esta disponible
        deferredPrompt = e;
        update(true);
        return () => {
          window.removeEventListener('beforeinstallprompt', listener);
        };
      });
    }
  }, []);
  return [
    deferredPrompt !== undefined,
    () => {
      if (deferredPrompt != null) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            deferredPrompt = null;
            update(undefined);
          }
        });
      }
    }];
};

export default useInstall;
