import styled from 'styled-components';
import ResponsiveText from "./apis/ResponsiveText";
import NavigationButtons from "./navigation/NavigationButtons";
import {navigate} from "gatsby";
import {useEffect, useState} from "react";
import createAndSendPDF from "./apis/pdf-email";
import {Alert} from "@mui/material";
import { useRamificacion } from "../context/RamificacionContext"; // Ajustá la ruta si es necesario
//HASTA ESTE PUNTO SE MODIFICO EL RETURN CON LOS BOTONES
//.
//.

const Buttons = ({petalos,bigButtonTitle,circuloBase,onClick, noNumber}) => {

    const [showAlertRamificar, setShowAlertRamificar] = useState(false);
    const [showAlertBorrar, setShowAlertBorrar] = useState(false);
    const [showAlertCorreccion, setShowAlertCorreccion] = useState(false);
    const { isRamificando, setIsRamificando } = useRamificacion();
    const [open, setOpen] = useState(false);

    const handleRamificar = () => {
        let history = localStorage.getItem("history");
        if (!history) history = [];
        else history = JSON.parse(history);

        setIsRamificando(prev => !prev); // Toggle ramificación
        setShowAlertRamificar(true);
        setTimeout(() => setShowAlertRamificar(false), 4000);

        const ramificarCount = history.filter(item => item === "ramificar").length;

        if (ramificarCount % 2 === 0 && history[history.length - 2]?.title !== "ramificar") {
            const linkPetaloDosAtras = history[history.length - 2]
                .replace('/circulo-base/', '')
                .replace(/^\//, '');

            const petaloDosAtras = findPetalo(petalos, linkPetaloDosAtras.split(':')[0] || linkPetaloDosAtras);

            if (petaloDosAtras && petaloDosAtras.title.length === 1) {
                history.splice(history.length - 3, 0, "ramificar");
            } else {
                history.splice(history.length - 2, 0, "ramificar");
            }
        } else {
            if (history.length === 0 || history[history.length - 1] !== "ramificar")
                history.push("ramificar");
        }

        localStorage.setItem("history", JSON.stringify(history));
    };

    const handleBorrar = () =>{
        let history = localStorage.getItem("history");
        if (!history) history = [];
        else history = JSON.parse(history);

        setShowAlertBorrar(true);
        history.pop()
        setTimeout(() => {
            setShowAlertBorrar(false);
        }, 4000);
                        
        localStorage.setItem("history", JSON.stringify(history));
    };
    
    const handlePDF = () =>{
        createAndSendPDF().then(r => console.log("PDF CREADO CORRECTAMENTE"))
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
             if (event.altKey) {
                let history = localStorage.getItem("history");

                if (!history) history = [];
                else history = JSON.parse(history);
                if (event.key === 'Control')
                    createAndSendPDF().then(r => console.log("PDF CREADO CORRECTAMENTE"))
                else if (event.key === 'c' || event.key === 'C') {    
                    setShowAlertCorreccion(true);
                    setTimeout(() => {
                        setShowAlertCorreccion(false);
                    }, 4000);
                    history.push("correccion")
                    localStorage.setItem("history", JSON.stringify(history))
                }
                else if (event.key === 'r' || event.key === 'R' || event.key === 'b' || event.key === 'B') {
                    if (event.key === 'r' || event.key === 'R') {
                        handleRamificar();
                    } else if (event.key === 'b' || event.key === 'B') {
                        handleBorrar();
                    }

                    
                } else if (event.key === 'Backspace')
                    navigate("/")
                else if (event.key === 'o' || event.key === 'O')
                    navigate("/intro-text");
            }
            else {
                switch (event.key) {
                    case 'ArrowLeft':
                        navigate(-1);
                        break;
                    case 'ArrowRight':
                        navigate(+1);
                        break;
                    case 'Enter':
                        navigate("/circulo-base");
                        break;
                    default:
                        if (/^[0-9]$/.test(event.key))
                            onClick(parseInt(event.key));
                        break;
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClick, showAlertBorrar, showAlertRamificar, setShowAlertRamificar, setShowAlertBorrar, petalos]);


        return (
        <PageContainer>
            <ButtonsContainerCenter>
                {isRamificando && <ContainerAlert>
                    <Alert severity="info">
                        Ramificando
                    </Alert> 
                </ContainerAlert>}

                {showAlertRamificar && <ContainerAlert>
                    <Alert severity="success">
                        Ramificacion
                    </Alert>
                </ContainerAlert>}

                {showAlertBorrar && <ContainerAlert>
                    <Alert severity="success">
                        Punto borrado de la sesion
                    </Alert>
                </ContainerAlert>}

                {showAlertCorreccion && <ContainerAlert>
                    <Alert severity="success">
                        Correccion
                    </Alert>
                </ContainerAlert>}

                <ButtonBig onClick={()=>navigate("/circulo-base")}>
                    <ResponsiveText scale={0.55} color={"#6e6e6e"}>
                        {bigButtonTitle}
                    </ResponsiveText>
                </ButtonBig>
                <ButtonsContainer>
                    {circuloBase && petalos.map((petalo) => (
                        <Button
                            onClick={()=>onClick(petalo.index + 1)}
                            bordercolor={getColorWithText(petalo.colorBorder)}
                            key={petalo.index}
                            angle={(petalo.index / (noNumber ? petalos.length+2 : 11)) * 360}
                        >
                            <ResponsiveText scale={0.8} color={'#6e6e6e'}>
                                {noNumber ? petalo.title : petalo.index + 1}
                            </ResponsiveText>
                        </Button>
                    ))}
                    {!circuloBase && Array.of(0,1,2,3,4,5,6,7,8,9).map((number) => (
                        <Button
                            onClick={()=>onClick(number)}
                            key={number}
                            bordercolor={getColorWithNumber(number)}
                            angle={(number / 10) * 360}
                        >
                            <ResponsiveText scale={0.8} color={'#6e6e6e'}>
                                {number}
                            </ResponsiveText>
                        </Button>
                        ))}

                </ButtonsContainer>
                <NavigationButtons/>
            </ButtonsContainerCenter>
            <div style={{ flexGrow: 0.1 }} />
            <BottomRightBox >
                <Toggle onClick={() => setOpen(!open)}>
                    {open ? '✖' : '☰'}
                </Toggle>
                                            
                <LoadButtons $open={open}>
                    <LoadB src="/images/simbolos/ramificacion.png" alt="Ramificacion" title="Ramificar" onClick={handleRamificar} />
                    <LoadB src="/images/simbolos/descarga2.png" alt="GuardarPDF" title="Guardar como PDF" onClick={handlePDF} />
                    <LoadB src="/images/simbolos/borrado.png" alt="Borrar Ultimo" title="Borrar Ultimo" onClick={handleBorrar} />
                    <LoadB src="/images/simbolos/oraciones2.png" alt="Oraciones" title="Oraciones" onClick={() => navigate("/intro-text")} />
                    <LoadB src="/images/simbolos/inicio2.png" alt="Inicio" title="Inicio" onClick={() => navigate('/')} />
                </LoadButtons>
                        
            </BottomRightBox>
        </PageContainer>
    );
};

const findPetalo = (petalos, linkName) => {
    for (let petalo of petalos) {
        if (petalo.linkName === linkName) {
            return petalo;
        }
        if (petalo.subPetalos) {
            const encontrado = findPetalo(petalo.subPetalos, linkName);
            if (encontrado) return encontrado;
        }
    }
    return null;
};

const ContainerAlert = styled.div`
  position: fixed;
  left: 20px;
  top: 20px;
  z-index: 999;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;


const BottomRightBox = styled.div`
position: absolute;
bottom: 20px;
right: 20px;
  
`;

const Toggle = styled.button`
  position: fixed;
  bottom: 15px;
  right: 15px;
  z-index: 10000;

  background-color: white;
  border: none;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;

  box-shadow: 0 0 10px rgba(0,0,0,0.2);
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 600px) {
    display: none; /* Oculta el toggle en pantallas grandes */
  }
`;

const LoadButtons = styled.div`
  display: ${props => props.$open ? "flex" : "none"};
  flex-direction: row;
  gap: 5px;
  margin-top: 10px;

  @media (min-width: 600px) {
    display: flex;
    margin-top: 0;
  }
`;

const LoadB = styled.img`
  width: 55px;
  height: 55px;
  cursor: pointer;
  background-color: white;
  padding: 1px;
  margin: 5px;
  border-radius: 50%;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow:
      0 0 10px white,
      0 0 10px white,
      0 0 10px white,
      0 0 10px #ffffff,
      0 0 10px #ffffff;
  }
`;

const ButtonsContainerCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
  
  @media (min-height: 600px) and (max-width: 539px) {
    margin-top: -70px;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;


const getColorWithText = (text) => {
    switch (text) {
        case "red":
            return "#c21212";
        case "yellow":
            return "#ced750";
        case "blue":
            return "#5052d7";
        case "green":
            return "#026908";
        case "orange":
            return "#d78850";
        case "purple":
            return "#a050d7";
        case "brown":
            return "#4f4421";
        case "greenLight":
            return "#50d757";
        case "blueLight":
            return "#5682be";
        case "yellowLight":
            return "#d7c450";
        case "redLight":
            return "#d75050";
        default:
            return "#ecc2e1";
    }
};

const getColorWithNumber = (number) => {
    switch (number) {
        case 1:
            return "#c21212";
        case 2:
            return "#ced750";
        case 3:
            return "#5052d7";
        case 4:
            return "#026908";
        case 5:
            return "#d78850";
        case 6:
            return "#a050d7";
        case 7:
            return "#4f4421";
        case 8:
            return "#50d757";
        case 9:
            return "#5682be";
        default:
            return "#ecc2e1";
    }
};

const ButtonBig = styled.div`
  background-color: #ffffff;
  border-radius: 50%;
  width: 220px;
  height: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: absolute;
  user-select: none;
  box-shadow: inset 15px 10px 20px 0 #ececec, 15px 10px 20px 0 rgba(154, 154, 154, 0.75);

  :hover {
    filter: brightness(0.6);
  }

  @media (max-width: 370px) {
    width: 90px;
    height: 90px;
  }
  @media (max-width: 410px) and (min-width: 370px) {
    width: 120px;
    height: 120px;
  }
  
  @media (max-width: 465px) and (min-width: 410px) {
    width: 140px;
    height: 140px;
  }

  @media (max-width: 540px) and (min-width: 465px) {
    width: 160px;
    height: 160px;
  }

  @media (max-width: 620px) and (min-width: 540px) {
    width: 180px;
    height: 180px;
  }
  
  
`;

let pi = 3.141592653589793;

const Button = styled.div`
  background-color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: absolute;
  user-select: none;
  box-shadow: 0 15px 15px 0 rgba(56, 56, 56, 0.75), 0 0 0 7px ${props => props.bordercolor};

  ${props => {
    const px = 230;
    const top = (-85 / 2) + calculatePositionCos(props.angle, px);
    const sin = (-85 / 2) + calculatePositionSin(props.angle, px);
    return `
      top: ${top}px;
      left: ${sin}px;
    `;
  }}

  width: 85px;
  height: 85px;

  @media (max-width: 370px) {
    ${props => {
      const px = 120;
      const top = (-40 / 2) + calculatePositionCos(props.angle, px);
      const sin = (-40 / 2) + calculatePositionSin(props.angle, px);
      return `
      top: ${top}px;
      left: ${sin}px;
    `;
    }}
    width: 40px;
    height: 40px;
  }

  @media (max-width: 410px) and (min-width: 370px) {
    ${props => {
      const px = 140;
      const top = (-60 / 2) + calculatePositionCos(props.angle, px);
      const sin = (-60 / 2) + calculatePositionSin(props.angle, px);
      return `
      top: ${top}px;
      left: ${sin}px;
    `;
    }}
    width: 60px;
    height: 60px;
  }

  @media (max-width: 465px) and (min-width: 410px) {
    ${props => {
      const px = 160;
      const top = (-60 / 2) + calculatePositionCos(props.angle, px);
      const sin = (-60 / 2) + calculatePositionSin(props.angle, px);
      return `
      top: ${top}px;
      left: ${sin}px;
    `;
    }}
    width: 60px;
    height: 60px;
  }

  @media (max-width: 540px) and (min-width: 465px) {
    ${props => {
      const px = 180;
      const top = (-80 / 2) + calculatePositionCos(props.angle, px);
      const sin = (-80 / 2) + calculatePositionSin(props.angle, px);
      return `
      top: ${top}px;
      left: ${sin}px;
    `;
    }}
    width: 80px;
    height: 80px;
  }

  @media (max-width: 620px) and (min-width: 540px){
    ${props => {
      const px = 210;
      const top = (-90 / 2) + calculatePositionCos(props.angle, px);
      const sin = (-90 / 2) + calculatePositionSin(props.angle, px);
      return `
      top: ${top}px;
      left: ${sin}px;
    `;
    }}
    width: 90px;
    height: 90px;
  }
  
  :hover {
    filter: brightness(0.6);
  }

`;

function calculatePositionCos(angle, px) {
    return Math.cos((angle * pi) / 180) * px;
}

function calculatePositionSin(angle, px) {
    return Math.sin((angle * pi) / 180) * px;
}

export default Buttons;