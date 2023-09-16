import ResponsiveText from "../components/apis/ResponsiveText";
import {useEffect, useState} from "react";
import {
    BackButton,
    NextButton
} from "../components/navigation/NavigationButtons";
import styled from "styled-components";
import {navigate} from "gatsby";
import LoginCheck from "../components/login/LoginCheck";

const IntroText = () => {
    const [number, setNumber] = useState(1);
    useEffect(() => {
        const handleKeyDown = (event) => {
            switch (event.key) {
                case 'Backspace':
                    navigate("/")
                    break;
                case 'ArrowLeft':
                    BackFunction({number, setNumber});
                    break;
                case 'ArrowRight':
                    NextFunction({number, setNumber});
                    break;
                default:
                    if (event.key === 'Enter')
                        navigate("/circulo-base")
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [number]);
    return TextComponent(number, setNumber)
}

const Navigate = ({number, setNumber}) => <Container>
    <BackButton color="black"
                onClick={()=> BackFunction({number,setNumber})}
    />
    <NextButton color="black"
                onClick={()=> NextFunction({number, setNumber})
    }/>
</Container>

const NextFunction = ({number, setNumber}) => {
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
            return navigate('/circulo-base');
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
`;

const TextContainer = styled.div`
  max-width: 95%;
`;

const TextComponent = (number, setNumber) => {
    return (
        <TextContainer>
            {
                {
                    '1':
                        <>
                            <ResponsiveText scale={0.7}>
                                ORACIÓN PARA ABRIR ESPACIO SAGRADO
                            </ResponsiveText>
                            <ResponsiveText scale={0.6} style={{marginTop: '10px'}}>
                                “Amado padre, pon escudo de protección en cada milímetro
                                de este recinto de sanación y amor incondicional y en toda mi
                                casa. pon guarda y custodia a todos los seres de luz que
                                siempre me acompañan: ángeles guardianes, angeles guias,
                                arcangeles, serafines, querubines, maestros ascendidos,
                                ondas positivas y al amado concilio del espíritu santo que rige,
                                a la madre maría que me acompaña y al amado jesús que es
                                mi guía. amén.“
                            </ResponsiveText>
                            <ResponsiveText scale={0.6} style={{marginTop: '20px'}}>
                                “Abrir terapia" de Robert Detzler“
                            </ResponsiveText>
                            <ResponsiveText scale={0.7} style={{marginTop: '20px'}}>
                                ORACIÓN PARA CERRAR ESPACIO SAGRADO
                            </ResponsiveText>
                            <ResponsiveText scale={0.6} style={{marginTop: '20px'}}>
                                "Voy a dar infinitas gracias a todo mi comité de yo superior y a
                                mi alma y al alma de ...(aquí recitas los nombres de los
                                consultantes) por este servicio y esta sanación, cierra sus
                                archivos Akáshicos y sus puertas astrales y te damos gracias
                                padre porque siempre estás conmigo, gracias madre por todo
                                lo que nos das y gracias al concilio del espíritu santo por tan
                                alto servicio. amén."
                            </ResponsiveText>
                        </>,
                    '2':
                        <>
                            <ResponsiveText scale={0.7}>
                                ORACION CHAMANICA PARA ABRIR EL ESPACIO SAGRADO
                            </ResponsiveText>
                            <ResponsiveText scale={0.6} style={{marginTop: '10px'}}>
                                A los vientos del sur, gran serpiente, envuélvenos en tus círculos de luz y amor. Enséñanos a
                                liberarnos del pasado, Como tú te renuevas de tu piel, guíanos por el sendero de la belleza.
                            </ResponsiveText>
                            <ResponsiveText scale={0.6} style={{marginTop: '20px'}}>
                                A los vientos del Oeste, Gran Jaguar, ven a proteger este espacio medicinal, rodéanos con tu
                                fuerza. Ven y enséñanos el camino de la paz, para vivir en armonía.
                            </ResponsiveText>
                            <ResponsiveText scale={0.6} style={{marginTop: '20px'}}>
                                A los vientos del Norte, Gran colibrí, abuelas y abuelos, antepasados, acérquense para calentar
                                sus manos en nuestro fuego. Susúrrenos con el viento para comunicarse con nosotros. Los
                                honramos a ustedes, que vinieron antes que nosotros, y a aquellos que vendrán después, de los
                                hijos de nuestros hijos."
                            </ResponsiveText>
                            <ResponsiveText scale={0.6} style={{marginTop: '20px'}}>
                                A los vientos del Este, Gran Águila, Cóndor, vengan a nosotros desde el lugar donde el sol
                                amanece, protégenos bajo tus alas, muéstranos las montañas que solo nos atrevemos a soñar.
                                Enséñennos a volar, ala con ala, con el gran espíritu.
                            </ResponsiveText>
                            <ResponsiveText scale={0.6} style={{marginTop: '20px'}}>
                                Madre Tierra, Pachamama, nos hemos congregado para la sanación de todos tus hijos: el pueblo
                                de las piedras, el reino de las plantas, aquellos de cuatro patas, los de dos patas, los que se
                                deslizan por el suelo, los que tienen aletas, los que tienen pelaje y los que tienen alas. Todos
                                nuestros parientes.
                            </ResponsiveText>
                            <ResponsiveText scale={0.6} style={{marginTop: '20px'}}>
                                Padre Sol, Abuela Luna, a las constelaciones de las Estrellas, Gran Espíritu, tú que eres conocido
                                por mil nombres y que eres innombrable. Gracias por abrir este espacio de amor incondicional,
                                haciéndonos uno con el Universo. Y permitirnos entonar el canto de la Vida.
                            </ResponsiveText>
                            <ResponsiveText scale={0.7} style={{marginTop: '10px'}}>
                                Ahó.
                            </ResponsiveText>
                        </>,
                    '3':
                        <>
                            <ResponsiveText scale={0.6}>
                                ORACION PARA TRANSMUTAR
                            </ResponsiveText>
                            <ResponsiveText scale={0.6} bold style={{marginTop: '15px'}}>
                                PARA BORRAR REGISTROS AKASHICOS – VIDAS PASADAS
                            </ResponsiveText>
                            <ResponsiveText scale={0.5} style={{marginTop: '15px'}}>
                                13X1 – 13X1 – 13X1
                            </ResponsiveText>
                            <ResponsiveText scale={0.5} style={{marginTop: '15px'}}>
                                Pido al responsable de los registros akáshicos que, en nombre de
                                nuestro Señor Jesucristo, elimine o transmute todos los registros
                                vinculados al suceso en el que estamos trabajando... y dado que ha
                                sido cumplido, doy infinitas gracias.
                            </ResponsiveText>
                            <ResponsiveText scale={0.5} style={{marginTop: '15px'}}>
                                13X1 – 13X1 – 13X1
                            </ResponsiveText>
                            <ResponsiveText scale={0.6} bold style={{marginTop: '15px'}}>
                                SI HAY PRESENCIAS ENERGÉTICAS EN EL CAMPO ÁURICO
                            </ResponsiveText>
                            <ResponsiveText scale={0.5} style={{marginTop: '15px'}}>
                                13X1 – 13X1 – 13X1
                            </ResponsiveText>
                            <ResponsiveText scale={0.5} style={{marginTop: '15px'}}>
                                Voy a solicitar al amado concilio del Espíritu Santo que, en nombre de
                                nuestro Señor Jesucristo, guíe a este ser desencarnado que afecta a mi
                                cliente. Pido que cierres el portal dimensional por donde ingresó, si
                                esta es tu voluntad, que lo conduzca hacia su destino adecuado.
                                También que reciba la iluminación que tanto requiere y se purifiquen
                                todas las energías negativas que ha dejado en su aura. Te agradezco,
                                Padre, por este valioso servicio. Amen
                            </ResponsiveText>
                            <ResponsiveText scale={0.5} style={{marginTop: '15px'}}>
                                13X1 – 13X1 – 13X1
                            </ResponsiveText>
                        </>,
                    '4':
                        <>
                            <ResponsiveText bold scale={0.6}>
                                ESCUDO DE PROTECCION
                            </ResponsiveText>
                            <ResponsiveText scale={0.6} style={{marginTop: '15px'}}>
                                9x9 – 9x9 – 9x9
                            </ResponsiveText>
                            <ResponsiveText scale={0.6} style={{marginTop: '15px'}}>
                                Padre celestial, te pido que extiendas tu divina protección sobre mí, mi
                                entorno y me cubras con una coraza espiritual que fortalezca nuestra fe,
                                integridad y espíritu. y nos brindes un escudo especial, un muro
                                protector que nos resguarde de cualquier daño físico, emocional o
                                espiritual. Gracias por tu amor y cuidado constante. Amén.
                            </ResponsiveText>
                            <ResponsiveText scale={0.6} style={{marginTop: '15px'}}>
                                9x9 – 9x9 – 9x9
                            </ResponsiveText>
                        </>,
                    '5':
                        <>
                            <ResponsiveText bold scale={0.6}>
                                PRE-CONEXIÓN CON FUENTE MADRE (AFIRMACION)
                                CONEXIÓN CON UNO MISMO…
                            </ResponsiveText>
                            <ResponsiveText scale={0.5} style={{marginTop: '20px'}}>
                                Estoy en conexión con mi ser superior
                            </ResponsiveText>
                            <ResponsiveText scale={0.5} style={{marginTop: '10px'}}>
                                Estoy en sintonía con mi ser más elevado
                            </ResponsiveText>
                            <ResponsiveText scale={0.5} style={{marginTop: '10px'}}>
                                Estoy unido a mi esencia divina
                            </ResponsiveText>
                            <ResponsiveText scale={0.5} style={{marginTop: '10px'}}>
                                Me encuentro imparcial al resultado de la terapia
                            </ResponsiveText>
                            <ResponsiveText scale={0.5} style={{marginTop: '10px'}}>
                                Estoy en total plenitud para dar energía
                            </ResponsiveText>
                            <ResponsiveText scale={0.5} style={{marginTop: '10px'}}>
                                Estoy en total plenitud para recibir energía
                            </ResponsiveText>
                            <ResponsiveText scale={0.5} style={{marginTop: '10px'}}>
                                Estoy en total plenitud para sentir la energía
                            </ResponsiveText>
                            <ResponsiveText scale={0.5} style={{marginTop: '10px'}}>
                                Estoy en total plenitud para obtener información
                            </ResponsiveText>
                        </>,
                    '6':
                        <>
                        <ResponsiveText scale={0.6} bold style={{marginTop: '20px'}}>
                            ORACION DE HO’OPONOPONO PARA INICIO DE SESION
                        </ResponsiveText>
                        <ResponsiveText scale={0.5} style={{marginTop: '10px'}}>
                            Divina presencia, sana aquí y ahora desde la raíz y para siempre, el problema o situación que trajo aquí (nombre del consultante) … haz que desbloque las energías negativas que le impiden avanzar, aportando energía sanadora, liberándome y liberandolo/a de toda responsabilidad para lograr su evolución
                            lo siento, perdóname, te amo, gracias
                        </ResponsiveText>
                        <ResponsiveText scale={0.6} bold style={{marginTop: '30px'}}>
                            CONEXIÓN CON EL PACIENTE
                        </ResponsiveText>
                        <ResponsiveText scale={0.5} style={{marginTop: '10px'}}>
                            ¿Está el paciente dispuesto y abierto a recibir la terapia?
                        </ResponsiveText>
                        <ResponsiveText scale={0.5} style={{marginTop: '10px'}}>
                            ¿Está el paciente abierto y receptivo hacia el terapeuta?
                        </ResponsiveText>
                        <ResponsiveText scale={0.5} style={{marginTop: '10px'}}>
                            ¿Quiere el ser de (nombre del consultante)… sanar, progresar y transformarse?
                        </ResponsiveText>
                        <ResponsiveText scale={0.5} style={{marginTop: '10px'}}>
                            ¿Acepta una sanación inmediata, completa, permitiendo encontrar una mejor versión para su bienestar y crecimiento personal?
                        </ResponsiveText>
                        <ResponsiveText scale={0.5} style={{marginTop: '10px'}}>
                            ¿Cuál de estos puntos prioriza el ser de (nombre del consultante) para sanar?
                        </ResponsiveText>
                    </>
                }[number]
            }
            <Navigate number={number} setNumber={setNumber}/>
        </TextContainer>
    );
}

export default IntroText;