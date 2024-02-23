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
    return <LoginCheck>
        {TextComponent(number, setNumber)}
    </LoginCheck>
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
                                Querido padre celestial, te pido que extiendas tu escudo de protección en cada rincón de este espacio dedicado a la sanación y al amor incondicional.
                                Coloca tu guarda y custodia a todos los seres de luz que me acompañan: ángeles guardianes, guías angelicales, arcángeles, serafines, querubines, maestros ascendidos, energías positivas, y  protección al amado concilio del Espíritu Santo que dirige, la presencia de la madre María que me acompaña y la sabiduría de Jesús que es mi guía, Amen.
                            </ResponsiveText>
                            <ResponsiveText scale={0.7} style={{marginTop: '20px'}}>
                                ORACIÓN PARA CERRAR ESPACIO SAGRADO
                            </ResponsiveText>
                            <ResponsiveText scale={0.6} style={{marginTop: '20px'}}>
                                Doy gracias de manera infinita a mi Comité de Yo Superior, a mi ser espiritual y los seres que estuvieron en este día de sanación, por este sagrado servicio de evolución y transformación.
                                En este momento, cierro amorosamente los archivos Akáshicos y las puertas astrales, confiando en la guía divina.
                                Te agradezco Padre por tu presencia constante en mi vida, Madre, por la abundancia que nos ofreces, y al Espíritu Santo por tu elevado servicio.
                                Que la luz del amor y sabiduría continue guiándonos en este viaje espiritual, Amen.
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
                                Me dirijo al amado Concilio del Espíritu Santo en nombre de nuestro Señor
                                Jesucristo, guíe a este desencarnado que afecta a (nombre de la consultante),
                                cierre el portal dimensional, iluminando su camino y liberando su aura de energías
                                negativas, te agradecemos, Padre, por este valioso servicio. Amén."
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
                                Padre celestial, te pido que extiendas tu divina protección sobre (nombre de la persona), y todo su entorno, que lo protejas con una coraza y escudo espiritual que fortalezca su fe, integridad y espíritu, creando un muro protector que lo resguarde de cualquier daño físico, emocional, mental o espiritual.
                                Gracias Padre, por tu amor y cuidado constante. Amén.
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