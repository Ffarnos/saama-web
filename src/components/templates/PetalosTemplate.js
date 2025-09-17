import styled from 'styled-components';
import ResponsiveText from "../apis/ResponsiveText";
import Buttons from "../Buttons";
import {useState} from "react";
import {navigate} from "gatsby";
import {Alert, TextField, ThemeProvider, createTheme} from "@mui/material";
import LoginCheck from "../login/LoginCheck";
import {Background} from "../Commons";
import historySave from "../navigation/History";
import { LegadoButton  } from "../navigation/LegadoButton";

const createdPages = require('../../../../createdPages.json');

const PetalosTemplate = ({ pageContext }) => {
    const {linkName, title, image, subPetalos, noNumber, titlePage} = pageContext
    const [showAlert, setShowAlert] = useState(false);
    const [input, setInput] = useState(0);
    const imagePath = "/images/" + image + ".webp";
    const handleChange = (event) => {
        setInput(event.target.value);
    };

    const color = getColorWithFuente(linkName)

    const theme = createTheme({
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: {
                        display: 'flex',
                        justifyContent: 'center',
                        '& .MuiInputBase-input': {
                            textAlign: 'center',
                        },
                        '& .MuiInputBase-root': {
                            color: 'white',
                            textAlign: 'center'
                        },
                        '& .MuiInput-underline:before': {
                            borderBottomColor: 'white',
                        },
                    },
                },
            },
        },
    });

    return <LoginCheck>
    <Background style={{backgroundImage: `url(${imagePath})`}}>
        <Container>
            <NoCircleContainer>
                <Title scale={1} color={color}>
                    {titlePage ? titlePage.toUpperCase() : ""}
                </Title>
                <Title scale={0.8} color={color}>
                    {title ? title.toUpperCase() : ""}
                </Title>
                <ContainerHorizontal>
                <ResponsiveText scale={0.6} color={color}>
                    Opciones {subPetalos.length}
                </ResponsiveText>
                {input !== 0 && <ThemeProvider theme={theme}>

                <TextField
                    id="standar-basic"
                    inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
                    value={input}
                    onChange={handleChange}
                    variant="standard"
                />
                </ThemeProvider>}
                </ContainerHorizontal>
            </NoCircleContainer>
            {showAlert && <ContainerAlert>
                <Alert severity="error">
                    La pagina solicitada no existe
                </Alert>
            </ContainerAlert>}
            <Buttons
                bigButtonTitle={"FUENTE MADRE"}
                circuloBase={noNumber}
                petalos={subPetalos}
                noNumber={noNumber}
                onClick={(number) => {
                    const numberFinal = (input ? ((input * 10) + number) : number);
                    setInput(numberFinal);
                    setTimeout(() => {
                        setInput((prevInput) => {
                            const newLink = "circulo-base/" + linkName + "/" + numberFinal;
                            if (!createdPages.includes(newLink)) {
                                setShowAlert(true);
                                setTimeout(() => setShowAlert(false),2000);
                                return 0;
                            } else if (numberFinal === prevInput) {
                                const newLink = "/circulo-base/" + linkName + "/" + numberFinal;
                                historySave(newLink);
                                navigate(newLink);
                            }
                            return prevInput;
                        });
                    }, 500);
                }}
            />
            
        </Container>
        <LegadoButton />
    </Background>
    </LoginCheck>;
} // BORRE LOAD BUTTON XQ LO AGREGUE EN BUTTONSs

const getColorWithFuente = (link) => {
    const match = link.match(/petalo-(\d+)/);
    const number = parseInt(match[1]);
    switch (number) {
        case 5:
            return "#595959"
        default:
            return "#fdf8f8"
    }
}


const ContainerHorizontal = styled.div`
  display: flex;
  gap: 20px;
`;

const NoCircleContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const ContainerAlert = styled.div`
  position: absolute;
  left: 20px;
  top: 20px;
  z-index: 999;
`;


const Title = styled(ResponsiveText)`
  text-shadow: 0 0 10px rgba(0,0,0,0.5);
`;

const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
`;


export default PetalosTemplate;
