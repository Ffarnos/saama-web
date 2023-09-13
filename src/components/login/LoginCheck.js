import { useEffect, useState } from 'react';
import {
    getAuth,
} from 'firebase/auth';
import {
    getDatabase,
} from 'firebase/database';
import {app} from "../../../gatsby-browser";
import LoginFirebase from "./LoginFirebase";

const LoginCheck = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = getAuth(app).onAuthStateChanged((user) => {
            setUser(user);
            //const userRef = getDatabase(app).ref(`users/${userId}`);

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);


    return <>{user || loading ? children : <LoginFirebase/>}</>;
};

export default LoginCheck;



