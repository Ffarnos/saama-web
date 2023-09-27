import {useEffect, useState} from 'react';
import {
    createUserWithEmailAndPassword,
    getAuth,
    sendPasswordResetEmail,
    signInWithEmailAndPassword
} from 'firebase/auth';
import {getDatabase, ref, set, get} from 'firebase/database';
import {app} from "../../../gatsby-browser";
import styled from "styled-components";
import {FormControl, IconButton, Input, InputAdornment, InputLabel, TextField} from "@mui/material";
import ResponsiveText from "../apis/ResponsiveText";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ResponsiveImage from "../apis/ResponsiveImage";
import Logo from "../../images/icon.png";

const LoginFirebase = ({noPermissionInfo}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUsername] = useState('');

    const [error, setError] = useState(null);
    const [register, setRegister] = useState('');
    const [sendPasswordMail , setSendPasswordMail] = useState(false);

    useEffect(() => {
        const lastPasswordResetTimestamp = localStorage.getItem(
            'lastPasswordResetTimestamp'
        );
        if (lastPasswordResetTimestamp) {
            const currentTime = new Date().getTime();
            const timeSinceLastReset = currentTime - lastPasswordResetTimestamp;
            if (timeSinceLastReset < 2 * 60 * 1000) {
                setSendPasswordMail(true);
            }
        }
    }, []);

    const handeChangePass = async (e) => {
        e.preventDefault();
        try {
            const auth = getAuth();
            await sendPasswordResetEmail(auth, email);
            setSendPasswordMail(true);
            const currentTime = new Date().getTime();
            localStorage.setItem(
                'lastPasswordResetTimestamp',
                currentTime.toString()
            );
        } catch (error) {
            console.error('Error al verificar el correo electrónico:', error);
        }
    }
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const auth = getAuth();


            if (register === '') {
                const isRegister = await checkEmailIsRegistered(email);
                if (isRegister)
                    setRegister('signin');
                else
                    setRegister('signup');
            }
            else if (register === 'signin') {
                await signInWithEmailAndPassword(auth, email, password);
            } else if (register === 'signup') {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                const usersRef = ref(getDatabase(app), 'users/' + user.uid);

                const newUser = {
                    email,
                    name,
                    surname,
                    username,
                    role: 'user',
                };

                await set(usersRef, newUser);
                window.location.reload();
            }
        } catch (error) {
            if (error.code === 'auth/invalid-email' || error.code === 'auth/wrong-password')
                setError('Datos de inicio incorrectos.');
            else
                setError('Ocurrió un error al iniciar sesión');

        }
    };

    document.body.style.overflow = 'hidden';

    return (<form name="contact" method="POST" data-netlify="true">
        <Container>
            <CardWrapper>
                <div>
                    <ResponsiveText color={"#4b4a4a"} scale={0.9}>Terapia GENESÍS</ResponsiveText>
                    <ContainerCenter>
                        <ResponsiveImage src={Logo} scale={1.8}/>
                    </ContainerCenter>

                    {!noPermissionInfo ? <OthersContainer>
                            <TextFieldContainer>
                                <TextField id="mail" label="Mail" variant="standard" margin="normal"
                                           onChange={(e) => setEmail(e.target.value)}/>

                                {register === 'signin' && <PasswordField setPassword={setPassword}/>}

                                {register === 'signin' && (
                                    sendPasswordMail ? (
                                        <ResponsiveText style={{marginTop: "10px"}} scale={0.3} color={"#3a3939"}>Se ha enviado un email para restablecer la contraseña</ResponsiveText>
                                    ) : (
                                        <PasswordResetContainer onClick={handeChangePass}>
                                            <PasswordReset scale={0.3}>Restablecer Contraseña</PasswordReset>
                                        </PasswordResetContainer>
                                    )
                                )}


                                {register === 'signup' && <SignUp setName={setName} setSurname={setSurname} setPassword={setPassword} setUsername={setUsername}/>}

                            </TextFieldContainer>
                            <div data-netlify-recaptcha="true"/>
                            <IniciarSesionButton color={"white"} bold scale={0.35} onClick={handleLogin}>
                                Continuar
                            </IniciarSesionButton>
                        </OthersContainer> :
                        <ResponsiveText style={{marginTop: "60px"}} color={"#4b4a4a"} scale={0.7}>Necesitas comprar la subscripcion para acceder</ResponsiveText>}
                    {error && <ErrorText color={"red"} scale={0.3}>{error}</ErrorText>}
                </div>
            </CardWrapper>
        </Container>
    </form>);

};

const PasswordResetContainer = styled.div`
  margin-top: 10px;
`;

const PasswordReset = styled(ResponsiveText)`
  text-decoration: underline; /* Subrayado del texto */
  color: #007bff; /* Color del texto */
  cursor: pointer;
  transition: color 0.3s; /* Transición suave del color */

  &:hover {
    color: #0056b3; /* Cambia el color del texto en hover */
  }
`;

const PasswordField = ({setPassword}) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return <>
        <FormControl variant="standard">
            <InputLabel htmlFor="standard-adornment-password">Contraseña</InputLabel>
            <Input
                id="standard-adornment-password"
                type={showPassword ? 'text' : 'password'}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                        >
                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                        </IconButton>
                    </InputAdornment>
                }
            />
        </FormControl>
    </>;
};

const SignUp = ({setName, setSurname, setUsername, setPassword}) => <>
    <TextField id="name" label="Nombre" variant="standard" onChange={(e) => setName(e.target.value)}/>
    <TextField id="surname" label="Apellido" variant="standard" onChange={(e) => setSurname(e.target.value)}/>
    <TextField id="username" label="Usuario" variant="standard" onChange={(e) => setUsername(e.target.value)}/>
    <PasswordField setPassword={setPassword}/>
</>;




const checkEmailIsRegistered = async (email) => {
    try {
        const dbRef = ref(getDatabase(app), 'users');
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
            const users = snapshot.val();
            return Object.values(users).some((user) => user.email === email);
        }

        return false;
    } catch (error) {
        console.error('Error al verificar el correo electrónico:', error);
        return false;
    }
};

const OthersContainer = styled.div`
  width: 100%; 
  margin: 0 auto;
`;

const TextFieldContainer = styled.div`
  display: flex;
  justify-content: left;
  flex-direction: column;
  width: 100%;
`;

const ContainerCenter = styled.div`
  display: flex;
  justify-content: center;
`;

const ErrorText = styled(ResponsiveText)`
    margin-top: 20px;
`;

const IniciarSesionButton = styled(ResponsiveText)`
  margin-top: 20px;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: #007BFF;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  :hover {
    filter: brightness(0.3);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;
const CardWrapper = styled.div`

  @media (min-width: 545px) {
    width: 70%;
    height: 75%;
    max-width: 400px;
    max-height: 600px;
    min-height: 300px;
    min-width: 200px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
`;
export default LoginFirebase;