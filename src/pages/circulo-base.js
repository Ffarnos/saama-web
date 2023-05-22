import * as React from "react"
import styled from 'styled-components';
import Buttons from "../components/Buttons";
import ResponsiveText from "../components/ResponsiveText";
import {navigate} from "gatsby";

const CirculoBase = () => {
    const petalos = [
        {
            index: 0,
            name: '1',
            colorBorder: "red",
            cantidad: 10,
            nombreSigMenu: "Guia Espiritual",
            colorSigMenu: "green",
        },
        {
            index: 1,
            name: '2',
            colorBorder: "greenLight",
            cantidad: 20,
            nombreSigMenu: "Guia Espiritual 2",
            colorSigMenu: "green",
        },
        {
            index: 2,
            name: '3',
            colorBorder: "yellow",
            cantidad: 5,
            nombreSigMenu: "Guia Espiritual 3",
            colorSigMenu: "green",
        },
        {
            index: 3,
            name: '4',
            colorBorder: "blue",
            cantidad: 12,
            nombreSigMenu: "Guia Espiritual 4",
            colorSigMenu: "green",
        },
        {
            index: 4,
            name: '5',
            colorBorder: "blueLight",
            cantidad: 4,
            nombreSigMenu: "Guia Espiritual 5",
            colorSigMenu: "green",
        },
        {
            index: 5,
            name: '6',
            colorBorder: "orange",
            cantidad: 8,
            nombreSigMenu: "Guia Espiritual 6",
            colorSigMenu: "green",
        },
        {
            index: 6,
            name: '7',
            colorBorder: "purple",
            cantidad: 3,
            nombreSigMenu: "Guia Espiritual 7",
            colorSigMenu: "green",
        },
    ];

    return <Background>
        <Container>
            <Title scale={0.8} color={"#6e6e6e"}>
                CIRCULO BASE
            </Title>
            <Buttons petalos={petalos} bigButtonTitle={"COMENZAR TERAPIA"} numbers={11} sig={true}/>
        </Container>
    </Background>;
}



const Title = styled(ResponsiveText)`
    letter-spacing: 15px;
    text-shadow: 0 0 10px rgba(0,0,0,0.5);
    margin-bottom: -20px;
`;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const Background = styled.div`
  background-color: white;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

export default CirculoBase;