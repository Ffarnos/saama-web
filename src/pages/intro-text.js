import ResponsiveText from "../components/apis/ResponsiveText";
import {useEffect, useState} from "react";
import {
    BackButton,
    NextButton
} from "../components/navigation/NavigationButtons";
import styled from "styled-components";
import {navigate} from "gatsby";
import LoginCheck from "../components/login/LoginCheck";
import {Alert, TextField} from "@mui/material";

const IntroText = () => {
    const [number, setNumber] = useState(1);
    const [problems, setProblems] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [isTextFieldFocused, setIsTextFieldFocused] = useState(false);

    useEffect(() => {
        document.documentElement.style.margin = "0";
        document.documentElement.style.padding = "0";
        document.body.style.margin = "0";
        document.body.style.padding = "0";
        document.body.style.overflowX = "hidden";
        document.documentElement.style.overflowX = "hidden";
        const handleKeyDown = (event) => {
            if (isTextFieldFocused) return;
            switch (event.key) {
                case 'Backspace':
                    navigate("/")
                    break;
                case 'ArrowLeft':
                    BackFunction({number, setNumber});
                    break;
                case 'ArrowRight':
                    NextFunction({number, setNumber, problems, setShowAlert});
                    break;
                default:
                    if (event.key === 'Enter')
                        navigate("/circulo-base")
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
             document.documentElement.style.margin = null;
             document.documentElement.style.padding = null;
             document.documentElement.style.overflowX = null;
             document.body.style.margin = null;
             document.body.style.padding = null;
             document.body.style.overflowX = null;
             document.removeEventListener('keydown', handleKeyDown);
        };
    }, [number, problems, isTextFieldFocused]);

    return <LoginCheck>
     <BackgroundContainer>
         <BlurredBox>
                {(showAlert && !localStorage.getItem("problems")) && <ContainerAlert>
                    <Alert severity="error">
                        Debes completar todos los campos
                    </Alert>
                </ContainerAlert>}
                {TextComponent(number, setNumber) }
                {(number === 6 && !localStorage.getItem("problems")) && <Problems problems={problems} setProblems={setProblems} setIsTextFieldFocused={setIsTextFieldFocused}/>}

                <Navigate number={number} setNumber={setNumber} problems={problems} setShowAlert={setShowAlert}/>
         </BlurredBox>
     </BackgroundContainer>
    </LoginCheck>
}

const ContainerProblems = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const Problems = ({problems, setProblems, setIsTextFieldFocused}) =>
    <ContainerProblems>
    <TextField id="problema1" label="Problematica 1" variant="filled" margin="normal"
               onChange={(e) => {
                   const prob = [...problems];
                   prob[0] = e.target.value;
                   setProblems(prob);
               }}
               onFocus={() => setIsTextFieldFocused(true)}
               onBlur={() => setIsTextFieldFocused(false)}
               sx={{
                   backgroundColor: 'white',
                   '&:hover': {
                       backgroundColor: 'white', // Mantener el fondo blanco al hacer hover
                   },
                   '&.Mui-focused': {
                       backgroundColor: 'white', // Mantener el fondo blanco cuando está enfocado
                   },
                   '& .MuiFilledInput-root': {
                       backgroundColor: 'white' // Mantener el fondo blanco para el input
                   }
               }}
    />

    <TextField id="problema2" label="Problematica 2" variant="filled" margin="normal"
               onChange={(e) => {
                   const prob = [...problems];
                   prob[1] = e.target.value;
                   setProblems(prob);
               }}
               onFocus={() => setIsTextFieldFocused(true)}
               onBlur={() => setIsTextFieldFocused(false)}
               sx={{
                   backgroundColor: 'white',
                   '&:hover': {
                       backgroundColor: 'white', // Mantener el fondo blanco al hacer hover
                   },
                   '&.Mui-focused': {
                       backgroundColor: 'white', // Mantener el fondo blanco cuando está enfocado
                   },
                   '& .MuiFilledInput-root': {
                       backgroundColor: 'white' // Mantener el fondo blanco para el input
                   }
               }}
    />
</ContainerProblems>
const Navigate = ({number, setNumber, problems, setShowAlert}) => <Container>
    <BackButton color="black"
                onClick={()=> BackFunction({number,setNumber})}
    />

    <NextButton color="black"
                onClick={()=> {
                    NextFunction({number, setNumber, problems, setShowAlert})
                }
    }/>
</Container>

const NextFunction = ({number, setNumber, problems, setShowAlert}) => {
    switch (number) {
        case 1:
            return setNumber((prev) => prev + 1);
        case 2:
            return setNumber((prev) => prev + 1);
        case 3:
            return setNumber((prev) => prev + 1);
        case 4:
            return setNumber((prev) => prev + 1);
        case 5:
            return setNumber((prev) => prev + 1);
        default:
            if (!localStorage.getItem("problems") && !problems.some(problem => problem)) {
                setShowAlert(true)
                setTimeout(() => {
                    setShowAlert(false)
                },4000)
            } else {
                if (problems.some(problem => problem))
                    localStorage.setItem('problems', problems)
                navigate('/circulo-base')
            }

    }
}

const BackFunction = ({number, setNumber}) => {
    switch (number) {
        case 2:
            return setNumber((prev) => prev - 1);
        case 3:
            return setNumber((prev) => prev - 1);
        case 4:
            return setNumber((prev) => prev - 1);
        case 5:
            return setNumber((prev) => prev - 1);
        default:
            return navigate('/');
    }
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    margin-top: 30px;
    margin-bottom: 40px;
    width: 100%;
    padding: 0 20px;
`;

const TextContainer = styled.div`
  max-width: 100%;
  margin: 0;
  padding: 0 1rem;
  text-align: center;
  box-sizing: border-box;
  
`;


const TextComponent = (number) => {
    return (
        <TextContainer>
            {
                {
                    '1':
                        <>
                            <ResponsiveText scale={0.7} style={{color:"white"}}>
                                ORACIÓN PARA ABRIR ESPACIO SAGRADO
                            </ResponsiveText>
                            <ResponsiveText scale={0.6} style={{marginTop: '10px', color:"white"}}>
                                Querido padre celestial, te pido que extiendas tu escudo de protección en cada rincón de este espacio dedicado a la sanación y al amor incondicional. Coloca tu guarda y custodia a todos los seres de luz que me acompañan: energías positivas, maestros ascendidos, ángeles guardianes, guías angelicales, arcángeles, serafines, querubines, la protección del amado concilio del Espíritu Santo que me guía, la presencia de la madre María que me asiste y la sabiduría de Jesús que me inspira, Amén.
                            </ResponsiveText>
                            <ResponsiveText scale={0.7} style={{marginTop: '20px',color:"white"}}>
                                ORACIÓN PARA CERRAR ESPACIO SAGRADO
                            </ResponsiveText>
                            <ResponsiveText scale={0.6} style={{marginTop: '10px',color:"white"}}>
                                Doy gracias de manera infinita a mi Comité de Yo Superior, a mi ser espiritual y los seres que estuvieron en este día de sanación, por este sagrado servicio de evolución y transformación. En este momento, cierro amorosamente los archivos Akáshicos y las puertas astrales, confiando en la guía divina. 
                                Te agradezco Padre por tu presencia constante en mi vida, Madre, por la abundancia que nos ofreces, y al Espíritu Santo por tu elevado servicio. Que la luz del amor y sabiduría continúe guiándonos en este viaje espiritual, Amén
                            </ResponsiveText>

                        </>,
                    '2':
                        <>
                            <ResponsiveText scale={0.7} style={{color:"white"}}>
                                ORACION CHAMANICA PARA ABRIR EL ESPACIO SAGRADO
                            </ResponsiveText>
                            <ResponsiveText scale={0.6} style={{marginTop: '10px',color: "white"}}>
                                A los vientos del Sur, gran serpiente, envuélvenos en tu círculo de luz y amor. Enséñanos a liberarnos del pasado, Como tú renuevas tu piel, guíanos por el sendero de la belleza. 
                            </ResponsiveText>
                            <ResponsiveText scale={0.6} style={{marginTop: '20px',color:"white"}}>
                                A los vientos del Oeste, Gran Jaguar, ven a proteger este espacio medicinal, rodéanos con tu fuerza. Ven y enséñanos el camino de la paz, para vivir en armonía.
                            </ResponsiveText>
                            <ResponsiveText scale={0.6} style={{marginTop: '20px',color:"white"}}>
                                A los vientos del Norte, Gran colibrí, abuelas y abuelos, antepasados, acérquense para calentar sus manos en nuestro fuego. Susúrrenos con el viento para comunicarse con nosotros. Los honramos a ustedes, que vinieron antes que nosotros, y a aquellos que vendrán después, de los hijos de nuestros hijos. “
                            </ResponsiveText>
                            <ResponsiveText scale={0.6} style={{marginTop: '20px',color:"white"}}>
                                A los vientos del Este, Gran Águila, Cóndor, vengan a nosotros desde el lugar donde el sol amanece, protégenos bajo tus alas, muéstranos las montañas que solo nos atrevemos a soñar. Enséñanos a volar, ala con ala, con el gran espíritu.
                            </ResponsiveText>
                            <ResponsiveText scale={0.6} style={{marginTop: '20px',color:"white"}}>
                                Madre Tierra, Pachamama, nos hemos congregado para la sanación de todos tus hijos: el pueblo de las piedras, el reino de las plantas, aquellos de cuatro patas, los de dos patas, los que se deslizan por el suelo, los que tienen aletas, los que tienen pelaje y los que tienen alas. Todos nuestros parientes.
                            </ResponsiveText>
                            <ResponsiveText scale={0.6} style={{marginTop: '20px',color:"white"}}>
                                Padre Sol, Abuela Luna, a las constelaciones de las Estrellas, Gran Espíritu, tú que eres conocido por mil nombres y que eres innombrable. Gracias por abrir este espacio de amor incondicional, haciéndonos uno con el Universo. Y permitirnos entonar el canto de la Vida.
                            </ResponsiveText>
                            <ResponsiveText scale={0.6} style={{marginTop: '10px',color:"white"}}>
                                Ahó.
                            </ResponsiveText>
                            <ResponsiveText scale={0.7} style={{marginTop: '20px',color:"white"}}>
                                ORACIÓN CHAMÁNICA PARA CERRAR EL ESPACIO SAGRADO
                            </ResponsiveText>
                            <ResponsiveText scale={0.6} style={{marginTop: '10px',color:"white"}}>
                                "Para concluir nuestra terapia al final del día, elevamos nuestro agradecimiento a la Serpiente, el Jaguar, el Colibrí, el Águila, el Cóndor, la Madre Tierra, el Padre Sol y la Abuela Luna, reconociendo su guía espiritual en nuestro viaje interior."
                            </ResponsiveText>
                        </>,
                    '3':
                        <>
                            <ResponsiveText scale={0.6} style={{color:"white"}}>
                                ORACION PARA TRANSMUTAR ENERGIAS
                            </ResponsiveText>
                            <ResponsiveText scale={0.6} bold style={{marginTop: '15px',color:"white"}}>
                                REGISTROS AKASHICOS – VIDAS PASADAS
                                (Utilizando el péndulo cuántico, decimos)
                            </ResponsiveText>
                            <ResponsiveText scale={0.5} style={{marginTop: '15px',color:"white"}}>
                                13 veces 1 - 13 veces 1 – 13 veces 1
                            </ResponsiveText>
                            <ResponsiveText scale={0.5} style={{marginTop: '15px',color:"white"}}>
                                Pido al responsable de los registros Akáshicos que, en nombre de nuestro Señor Jesucristo, elimine o transmute todos los registros vinculados al suceso en el que estamos trabajando... y dado que ha sido cumplido, doy infinitas gracias.
                            </ResponsiveText>
                            <ResponsiveText scale={0.5} style={{marginTop: '15px',color:"white"}}>
                                13 veces 1 - 13 veces 1 – 13 veces 1
                            </ResponsiveText>
                            <ResponsiveText scale={0.6} bold style={{marginTop: '15px',color:"white"}}>
                                SI HAY PRESENCIAS ENERGÉTICAS EN EL CAMPO ÁURICO
                                (Utilizando el péndulo cuántico, decimos)
                            </ResponsiveText>
                            <ResponsiveText scale={0.5} style={{marginTop: '15px',color:"white"}}>
                                13 veces 1 - 13 veces 1 – 13 veces 1
                            </ResponsiveText>
                            <ResponsiveText scale={0.5} style={{marginTop: '15px',color:"white"}}>
                                Me dirijo al amado Concilio del Espíritu Santo en nombre de nuestro Señor Jesucristo, guíe a este desencarnado que afecta a (nombre de la consultante), cierre el portal dimensional, iluminando su camino y liberando su aura de energías negativas, te agradecemos, Padre, por este valioso servicio. Amén."
                            </ResponsiveText>
                            <ResponsiveText scale={0.5} style={{marginTop: '15px',color:"white"}}>
                                13 veces 1 - 13 veces 1 – 13 veces 1
                            </ResponsiveText>
                        </>,
                    '4':
                        <>
                            <ResponsiveText bold scale={0.6} style={{color:"white"}}>
                                ESCUDO DE PROTECCION
                            </ResponsiveText>
                            <ResponsiveText scale={0.6} style={{marginTop: '15px',color:"white"}}>
                                9 veces 9 – 9 veces 9 – 9 veces 9
                            </ResponsiveText>
                            <ResponsiveText scale={0.6} style={{marginTop: '15px',color:"white"}}>
                                Padre celestial, te pido que extiendas tu divina protección sobre (nombre de la persona) y todo su entorno. Cúbrelo con tu luz y fortalece su espíritu. Rodéalo con una armadura energética que lo preserve de todo daño. Gracias, Padre, por tu amor incondicional y tu cuidado constante. Amén
                            </ResponsiveText>
                            <ResponsiveText scale={0.6} style={{marginTop: '15px',color:"white"}}>
                                9 veces 9 – 9 veces 9 – 9 veces 9
                            </ResponsiveText>
                        </>,
                    '5':
                        <>
                            <ResponsiveText bold scale={0.6} style={{color:"white"}}>
                                PRE-CONEXIÓN CON FUENTE MADRE (Testear) 
                                CONEXIÓN CON UNO MISMO…
                            </ResponsiveText>
                            <ResponsiveText scale={0.5} style={{marginTop: '20px',color:"white"}}>
                                Estoy en conexión con mi ser superior
                            </ResponsiveText>
                            <ResponsiveText scale={0.5} style={{marginTop: '10px',color:"white"}}>
                                Estoy en sintonía con mi ser más elevado
                            </ResponsiveText>
                            <ResponsiveText scale={0.5} style={{marginTop: '10px',color:"white"}}>
                                Estoy unido a mi esencia divina
                            </ResponsiveText>
                            <ResponsiveText scale={0.5} style={{marginTop: '10px',color:"white"}}>
                                Me encuentro imparcial al resultado de la terapia
                            </ResponsiveText>
                            <ResponsiveText scale={0.5} style={{marginTop: '10px',color:"white"}}>
                                Estoy en total plenitud para dar energía
                            </ResponsiveText>
                            <ResponsiveText scale={0.5} style={{marginTop: '10px',color:"white"}}>
                                Estoy en total plenitud para recibir energía
                            </ResponsiveText>
                            <ResponsiveText scale={0.5} style={{marginTop: '10px',color:"white"}}>
                                Estoy en total plenitud para sentir la energía
                            </ResponsiveText>
                            <ResponsiveText scale={0.5} style={{marginTop: '10px',color:"white"}}>
                                Estoy en total plenitud para obtener información
                            </ResponsiveText>
                        </>,
                    '6':
                        <>
                            <ResponsiveText scale={0.6} bold style={{marginTop: '20px',color:"white"}}>
                                ORACION DE HO’OPONOPONO PARA INICIO DE SESION
                            </ResponsiveText>
                            <ResponsiveText scale={0.5} style={{marginTop: '10px',color:"white"}}>
                                Divina presencia, sana aquí y ahora desde la raíz y para siempre, el problema o situación que trajo aquí (nombre del consultante) … haz que desbloque las energías negativas que le impiden avanzar, aportando energía sanadora, liberándome y liberandolo/a de toda responsabilidad para lograr su evolución lo siento, perdóname, te amo, gracias
                            </ResponsiveText>
                            <ResponsiveText scale={0.6} bold style={{marginTop: '30px',color:"white"}}>
                                CONEXIÓN CON EL PACIENTE
                            </ResponsiveText>
                            <ResponsiveText scale={0.5} style={{marginTop: '10px',color:"white"}}>
                                ¿Está el paciente dispuesto y abierto a recibir la terapia?
                            </ResponsiveText>
                            <ResponsiveText scale={0.5} style={{marginTop: '10px',color:"white"}}>
                                ¿Está el paciente abierto y receptivo hacia el terapeuta?
                            </ResponsiveText>
                            <ResponsiveText scale={0.5} style={{marginTop: '10px',color:"white"}}>
                                ¿Quiere el ser de (nombre del consultante)… sanar, progresar y transformarse?
                            </ResponsiveText>
                            <ResponsiveText scale={0.5} style={{marginTop: '10px', color:"white"}}>
                                ¿Acepta una sanación inmediata, completa, permitiendo encontrar una mejor versión para su bienestar y crecimiento personal?
                            </ResponsiveText>
                            <ResponsiveText scale={0.5} style={{marginTop: '10px', color:"white"}}>
                                ¿Cuál de estos puntos prioriza el ser de (nombre del consultante) para sanar?
                            </ResponsiveText>

                        </>
                }[number]
            }
        </TextContainer>
    );
}
const BackgroundContainer = styled.div`
 background-image: url('/images/portada.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  width: 100%; /* NO usar 100vw */
  min-height: 100vh;

  margin: 0;
  padding: 0;

  display: flex;
  flex-direction: column;
  align-items: center;

  overflow-x: hidden;
`;

const BlurredBox = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 20px;
  padding: 40px;
  max-width: 90vw;
  width: 100%;
  box-sizing: border-box;
  margin: 5px auto;
  
`;

const ContainerAlert = styled.div`
  position: absolute;
  left: 20px;
  top: 20px;
  z-index: 999;
`;

export default IntroText;