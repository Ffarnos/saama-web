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
  apiKey: "AIzaSyBvF1yC5lmZ9YLaWEPHqZfHVZHBg1ChAPQ",
  authDomain: "saama-4bc7b.firebaseapp.com",
  projectId: "saama-4bc7b",
  storageBucket: "saama-4bc7b.appspot.com",
  messagingSenderId: "177528645527",
  appId: "1:177528645527:web:6127415a2b13d2b99706d2",
  measurementId: "G-JZCM5YZV7H",
  databaseURL: "https://saama-4bc7b-default-rtdb.firebaseio.com",
};

export const app = initializeApp(firebaseConfig);



