import 'firebase/auth';
import { initializeApp } from 'firebase/app';


export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
      `La aplicacion se ha actualizado ` +
      `Necesitas recargarla para no perderte los nuevos cambios`
  )

  if (answer === true) {
    window.location.reload()
  }
}

const firebaseConfig = {
  apiKey: "AIzaSyAEwgR9D1dyYHeAn2BQryHm-IuipfgBCrs",
  authDomain: "terapia-genesis.firebaseapp.com",
  projectId: "terapia-genesis",
  storageBucket: "terapia-genesis.appspot.com",
  messagingSenderId: "937946542554",
  appId: "1:937946542554:web:98a501ed67031108f490e3",
  measurementId: "G-SG8Q78JFK7",
  databaseURL: "https://terapia-genesis-default-rtdb.firebaseio.com/",
};

export const app = initializeApp(firebaseConfig);



