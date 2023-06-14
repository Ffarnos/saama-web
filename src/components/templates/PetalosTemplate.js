import * as React from "react"
import styled from 'styled-components';
import ResponsiveText from "../apis/ResponsiveText";
import Buttons from "../Buttons";
import {useState} from "react";
import {navigate} from "gatsby";
import {Alert, TextField} from "@mui/material";
import {FinishButtonResponsive} from "../navigation/FinishButton";

const createdPages = require('../../../../createdPages.json');

const PetalosTemplate = ({ pageContext }) => {
    const {linkName, title, image, subPetalos, petalos} = pageContext
    const [showAlert, setShowAlert] = useState(false);
    const [input, setInput] = useState(0);
    const imagePath = "/images/" + image + ".webp";
    const handleChange = (event) => {
        setInput(event.target.value);
    };

    return <Background style={{backgroundImage: `url(${imagePath})`}}>
        <Container>
            <NoCircleContainer>
                <Title scale={0.8} color={"#fdf8f8"}>
                    {title}
                </Title>
                <ResponsiveText scale={0.6} color={"#fdf8f8"}>
                    Pétalos {petalos}
                </ResponsiveText>
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
                bigButtonTitle={"FUNTE GUÍA"}
                circuloBase={subPetalos !== undefined}
                petalos={subPetalos}
                noNumber={subPetalos !== undefined}
                onClick={(number) => {
                    if (subPetalos) {
                        navigate("/circulo-base/" + linkName + "/" + number)
                        return;
                    }
                    const numberFinal = (input ? (input * 10) : 0) + number;
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
                    }, 2000);
                }}
            />
            <FinishButtonResponsive/>
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
  left: 20px;
  top: 20px;
  z-index: 999;
`;


const Title = styled(ResponsiveText)`
  letter-spacing: 15px;
  text-shadow: 0 0 10px rgba(0,0,0,0.5);
`;

const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
`;

export const Background = styled.div`
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888888; /* Color del thumb de la scrollbar */
    border-radius: 2px;
  }
`;

export default PetalosTemplate;
