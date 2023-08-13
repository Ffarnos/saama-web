import * as React from "react";
import ResponsiveText from "../components/apis/ResponsiveText";
import {useEffect, useState} from "react";
import {
    BackButton,
    NextButton
} from "../components/navigation/NavigationButtons";
import styled from "styled-components";
import {navigate} from "gatsby";


const IntroText = () => {
    const [number, setNumber] = useState(1);
    useEffect(() => {
        const handleKeyDown = (event) => {
            switch (event.key) {
                case 'Enter':
                    navigate("/circulo-base")
                    break;
                case 'Backspace':
                    navigate("/")
                    break;
                case 'ArrowLeft':
                    setNumber((prev) => {
                        if (prev === 1) return 1;
                        return prev - 1;
                    })
                    break;
                case 'ArrowRight':
                    setNumber((prev) => {
                        if (prev === 5) {
                            navigate("/circulo-base")
                            return 5;
                        }
                        return prev + 1;
                    })
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);
    return <>
        {getText(number)}
        <Navigate number={number} setNumber={setNumber} max={5}/>
    </>
}

const Navigate = ({number, setNumber, max}) => <Container>
    <BackButton color="black" onClick={()=> setNumber((prev) => prev - 1)}/>
    <NextButton color="black" onClick={()=>
        number + 1 === max ? navigate('/circulo-base') : setNumber((prev) => prev + 1)
    }/>
</Container>

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 80px;
    margin-top: 30px;
`;

const TextContainer = styled.div`
    max-width: 1000px;
    margin-right: auto;
    margin-left: auto;
`;
const getText = (number) => {
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
                                “Abrir terapia" de robert detzler“
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
                                Pido al responsable de los registros akáshicosque, en nombre de
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
                            <ResponsiveText scale={0.6} style={{marginTop: '15px'}}>
                                PRE-CONEXIÓN CON FUENTE MADRE
                                (AFIRMACION)
                            </ResponsiveText>
                            <ResponsiveText scale={0.6} style={{marginTop: '15px'}}>
                                CONEXIÓN CON UNO MISMO…
                            </ResponsiveText>
                            <ResponsiveText scale={0.6} style={{marginTop: '15px'}}>
                                ESTOY EN CONEXIÓN CON MI SER SUPERIOR
                                ESTOY EN SINTONIA CON MI SER MAS ELEVADO
                                ESTOY UNIDO A MI ESENCIA DIVINA
                                ME ENCUENTRO IMPARCIAL AL RESULTADO DE LA TERAPIA
                                ESTOY EN TOTAL PLENITUD PARA DAR ENERGIA
                                ESTOY EN TOTAL PLENITUD PARA RECIBIR ENERGIA
                                ESTOY EN TOTAL PLENITUD PARA SENTIR LA ENERGIA
                                ESTOY EN TOTAL PLENITUD PARA OBTENER INFORMACION
                            </ResponsiveText>
                        </>,
                    '5':
                        <>
                            <ResponsiveText bold scale={0.6}>
                                PRE CONEXIÓN FUENTE MADRE
                            </ResponsiveText>
                            <ResponsiveText scale={0.5} style={{marginTop: '20px'}}>
                                ESTOY EN CONEXIÓN CON MI YO SUPERIOR.
                            </ResponsiveText>
                            <ResponsiveText scale={0.5} style={{marginTop: '10px'}}>
                                ESTOY PLENAMENTE DISPUESTO/A A RECIBIR INFORMACIÓN.
                            </ResponsiveText>
                            <ResponsiveText scale={0.5} style={{marginTop: '10px'}}>
                                ESTOY RECEPTIVO/A AL MÁXIMO PARA RECIBIR INFORMACIÓN.
                            </ResponsiveText>
                            <ResponsiveText scale={0.5} style={{marginTop: '10px'}}>
                                ESTOY EN PLENO POTENCIAL PARA COMPARTIR ENERGÍA.
                            </ResponsiveText>
                            <ResponsiveText scale={0.5} style={{marginTop: '10px'}}>
                                ME PERMITO SENTIR PLENAMENTE LA ENERGÍA.
                            </ResponsiveText>
                            <ResponsiveText scale={0.5} style={{marginTop: '10px'}}>
                                ESTOY ALINEADO/A CON MI POTENCIAL FEMENINO MÁXIMO.
                            </ResponsiveText>
                            <ResponsiveText scale={0.5} style={{marginTop: '10px'}}>
                                ESTOY SIEMPRE PROTEGIDO/A POR MIS GUÍAS.
                            </ResponsiveText>
                            <ResponsiveText scale={0.5} style={{marginTop: '10px'}}>
                                SOY CAPAZ DE IR MÁS ALLÁ DEL ESPACIO Y DEL TIEMPO.
                            </ResponsiveText>
                            <ResponsiveText scale={0.5} style={{marginTop: '10px'}}>
                                TENGO LA CAPACIDAD DE IMAGINACIÓN INAGOTABLE.
                            </ResponsiveText>
                            <ResponsiveText scale={0.5} style={{marginTop: '10px'}}>
                                TENGO LA CAPACIDAD DE TRASCENDER LOS LÍMITES.
                            </ResponsiveText>
                            <ResponsiveText scale={0.5} style={{marginTop: '10px'}}>
                                ¿ESTÁ EL PACIENTE DISPUESTO Y ABIERTO A RECIBIR LA TERAPIA?
                            </ResponsiveText>
                            <ResponsiveText scale={0.5} style={{marginTop: '10px'}}>
                                ¿ESTÁ EL PACIENTE ABIERTO Y RECEPTIVO HACIA EL TERAPEUTA?
                            </ResponsiveText>
                            <ResponsiveText scale={0.5} style={{marginTop: '10px'}}>
                                ¿EL PACIENTE TIENE EXPECTATIVAS DE SANACIÓN TEMPORALES?
                            </ResponsiveText>
                            <ResponsiveText scale={0.5} style={{marginTop: '10px'}}>
                                ¿EL PACIENTE BUSCA SANAR, CRECER Y EVOLUCIONAR?                            </ResponsiveText>
                            <ResponsiveText scale={0.6} style={{marginTop: '20px'}}>
                                Oracion de Ho’oponopono
                            </ResponsiveText>
                            <ResponsiveText scale={0.6} style={{marginTop: '20px'}}>
                                para inicarsesión con cada consultante
                            </ResponsiveText>
                            <ResponsiveText scale={0.6} style={{marginTop: '30px'}}>
                                Pedi a mi divina presencial que limpie la parte de
                                responsabilidad que hay en mi, que hacer que… (nombre de
                                mi paciente), este hoy aquí en mi consulta con… el problema
                                que tratas. Perdoname, lo siento, te amo, gracias
                            </ResponsiveText>
                        </>,
                    6:
                        <>
                            <ResponsiveText scale={0.6}>
                                ORACION DE HO’OPONOPONO PARA INICIO DE SESION
                                DIVINA PRESENCIA, SANA AQUÍ Y AHORA DESDE LA RAIZ Y PARA SIEMPRE, EL PROBLEMA O SITUACIÓN QUE TRAJO AQUÍ (nombre del consultante)… HAZ QUE DESBLOQUE LAS ENERGIAS NEGATIVAS QUE LE IMPIDEN AVANZAR, APORTANDO ENERGIA SANADORA, LIBERÁNDOME Y LIBERÁNDOLO DE TODA RESPONSABILIDAD PARA LOGRAR SU EVOLUCIÓN
                                LO SIENTO, PERDONAME, TE AMO, GRACIAS
                            </ResponsiveText>
                            <ResponsiveText scale={0.6} style={{marginTop: '20px'}}>
                                CONEXIÓN CON EL PACIENTE
                            </ResponsiveText>
                            <ResponsiveText scale={0.6} style={{marginTop: '20px'}}>
                                ¿ESTÁ EL PACIENTE DISPUESTO Y ABIERTO A RECIBIR LA TERAPIA?
                                ¿ESTÁ EL PACIENTE ABIERTO Y RECEPTIVO HACIA EL TERAPEUTA?
                                ¿QUIERE EL SER DE (nombre del consultante)… SANAR, PROGRESAR Y TRANSFORMARSE?
                                ¿ACEPTA UNA SANACIÓN INMEDIATA, COMPLETA, PERMITIENDO ENCONTRAR UNA MEJOR VERSION PARA SU BIENESTAR Y CRECIMIENTO PERSONAL?
                                ¿CUAL DE ESTOS PUNTOS PRIORIZA EL SER DE (nombre del consultante) PARA SANAR?
                            </ResponsiveText>
                        </>
                }[number]
            }
        </TextContainer>
    );
}

export default IntroText;