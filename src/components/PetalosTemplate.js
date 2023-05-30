import * as React from "react"
import styled from 'styled-components';
import ResponsiveText from "./ResponsiveText";
import Buttons from "./Buttons";
import {useState} from "react";
import {navigate} from "gatsby";
import {Alert, TextField} from "@mui/material";


const createdPages = require('../../../createdPages.json');

const PetalosTemplate = ({ pageContext }) => {
    const { linkName,title,image} = pageContext
    const [showAlert, setShowAlert] = useState(false);
    const [input, setInput] = useState(0);
    const imagePath = "/images/"+ image + ".webp";

    const handleChange = (event) => {
        setInput(event.target.value);
    };


    return <Background style={{backgroundImage: `url(${imagePath})`}}>
        <Container>
            <NoCircleContainer>
            <Title scale={0.8} color={"#6e6e6e"}>
                {title}
            </Title>
                {input !== 0 && <TextField
                    id="standar-basic"
                    value={input}
                    onChange={handleChange}
                    variant="standard"
            />}
            </NoCircleContainer>
            {showAlert && <ContainerAlert>
                <Alert severity="error">
                    La pagina solicitada no existe
                </Alert>
            </ContainerAlert>}
            <Buttons
                bigButtonTitle={"COMENZAR TERAPIA"}
                circuloBase={false}
                onClick={(number)=> {
                    const numberFinal = (input ? (input * 10) : 0) + number;
                    setInput(numberFinal);
                    setTimeout(() => {
                        setInput((prevInput) => {
                            const newLink = "circulo-base/" + linkName + "/" + numberFinal;
                            if (!createdPages.includes(newLink)) {
                                setShowAlert(true);
                                setInput(()=>0)
                                setTimeout(() => {
                                    setShowAlert(false);
                                }, 2000);
                            }else if (numberFinal === prevInput)
                                navigate("/circulo-base/" + linkName + "/" + numberFinal);
                            return prevInput;
                        });
                    }, 2000);
                }}
            />

        </Container>
    </Background>;
}


const NoCircleContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const ContainerAlert = styled.div`
  position: absolute;
  left: 20px; /* Ajusta la posición horizontal según tus necesidades */
  top: 20px; /* Ajusta la posición vertical según tus necesidades */
  z-index: 999; /* Asegura que la alerta esté por encima de los demás componentes */
`;


const Title = styled(ResponsiveText)`
  letter-spacing: 15px;
  text-shadow: 0 0 10px rgba(0,0,0,0.5);
  margin-bottom: 15px;
`;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const Background = styled.div`
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: scroll;
`;

export default PetalosTemplate;
