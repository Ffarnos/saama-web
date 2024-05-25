import React, { createContext, useContext, useEffect } from 'react';
import { initializeApp } from 'firebase/app';

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

const firebaseApp = initializeApp(firebaseConfig);

const FirebaseContext = createContext(null);

export const FirebaseProvider = ({ children }) => {
    return (
        <FirebaseContext.Provider value={firebaseApp}>
            {children}
        </FirebaseContext.Provider>
    );
};

export const useFirebase = () => {
    return useContext(FirebaseContext);
};
