import styled from 'styled-components';
import ResponsiveText from "../apis/ResponsiveText";
import Buttons from "../Buttons";
import {useState} from "react";
import {navigate} from "gatsby";
import {Alert, TextField, ThemeProvider, createTheme} from "@mui/material";
import {FinishButtonResponsive} from "../navigation/FinishButton";
import LoginCheck from "../login/LoginCheck";
import {Background} from "../Commons";

const createdPages = require('../../../../createdPages.json');

const PetalosTemplate = ({ pageContext }) => {
    const {linkName, title, image, subPetalos, noNumber, titlePage} = pageContext
    const [showAlert, setShowAlert] = useState(false);
    const [input, setInput] = useState(0);
    const imagePath = "/images/" + image + ".webp";
    const handleChange = (event) => {
        setInput(event.target.value);
    };

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
                <Title scale={1} color={"#fdf8f8"}>
                    {titlePage ? titlePage.toUpperCase() : ""}
                </Title>
                <Title scale={0.8} color={"#fdf8f8"}>
                    {title ? title.toUpperCase() : ""}
                </Title>
                <ContainerHorizontal>
                <ResponsiveText scale={0.6} color={"#fdf8f8"}>
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
                            } else if (numberFinal === prevInput)
                                navigate("/circulo-base/" + linkName + "/" + numberFinal);
                            return prevInput;
                        });
                    }, 500);
                }}
            />
            <FinishButtonResponsive/>
        </Container>
    </Background>
    </LoginCheck>;
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
