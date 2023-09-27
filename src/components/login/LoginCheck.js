import { useEffect, useState } from 'react';
import {
    getAuth,
} from 'firebase/auth';
import {app} from "../../../gatsby-browser";
import LoginFirebase from "./LoginFirebase";
import {getDatabase, ref, get} from "firebase/database";


const LoginCheck = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [hasPermission, setHasPermission] = useState(false);
    const [authenticatedUser, setAuthenticatedUser] = useState(null);

    useEffect(() => {
        const authUnsubscribe = getAuth(app).onAuthStateChanged((user) => {
            if (user) {
                setAuthenticatedUser(user);
                const usersRef = ref(getDatabase(app), 'users/' + user.uid);
                get(usersRef)
                    .then((snapshot) => {
                        setHasPermission(snapshot.exists() && (snapshot.val().role !== 'user'))
                        setLoading(false);
                    })
                    .catch((error) => {
                        console.error('Error al obtener el rol del usuario:', error);
                    });
            } else {
                // Cuando el usuario cierra sesión, restablece el estado del usuario autenticado
                setAuthenticatedUser(null);
                setLoading(false);
            }
        });

        return () => {
            authUnsubscribe();
        };
    }, [loading]);


    let noPermissionInfo = false;

    if (authenticatedUser && !hasPermission)
        noPermissionInfo = true;

    return <>
        {(authenticatedUser && hasPermission) || loading ? children : <LoginFirebase noPermissionInfo={noPermissionInfo}/>}
    </>;
};

export default LoginCheck;



