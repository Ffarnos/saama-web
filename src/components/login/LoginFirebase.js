import {useState} from 'react';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {app} from "../../../gatsby-browser";
import styled from "styled-components";
import {FormControl, IconButton, InputAdornment, InputLabel, TextField, Input} from "@mui/material";
import ResponsiveText from "../apis/ResponsiveText";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ResponsiveImage from "../apis/ResponsiveImage";
import Logo from "../../images/icon.png";

const LoginFirebase = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(getAuth(app), email, password);

        } catch (error) {
            if (error.code === 'auth/invalid-email' || error.code === 'auth/wrong-password')
                setError('Datos de inicio incorrectos.');
            else
                setError('Ocurrió un error al iniciar sesión');

        }
    };

    document.body.style.overflow = 'hidden';

    return (<Container>
            <CardWrapper>
                <div>
                    <ResponsiveText color={"#4b4a4a"} scale={0.9}>Terapia GENESÍS</ResponsiveText>
                    <ContainerCenter>
                        <ResponsiveImage src={Logo} scale={2.4}/>
                    </ContainerCenter>
                    <OthersContainer>
                    <TextFieldContainer>
                        <TextField id="mail" label="Mail" variant="standard" margin="normal"
                                   onChange={(e) => setEmail(e.target.value)}/>
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
                    </TextFieldContainer>
                    <IniciarSesionButton color={"white"} bold scale={0.35} onClick={handleLogin}>Iniciar
                        Sesion</IniciarSesionButton>
                    </OthersContainer>
                    {error && <ErrorText color={"red"} scale={0.3}>{error}</ErrorText>}
                </div>
            </CardWrapper>
        </Container>
    );
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
  margin-top: 30px;
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