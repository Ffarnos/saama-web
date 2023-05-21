import * as React from "react"
import styled from 'styled-components';
import Buttons from "../components/Buttons";
import ResponsiveText from "../components/ResponsiveText";

const CirculoBase = () => {
    const petalos = [
        {
            name: '1',
            colorBorder: "red",
            cantidad: 10,
            nombreSigMenu: "Guia Espiritual",
            colorSigMenu: "green",
        },
        {
            name: '2',
            colorBorder: "greenLight",
            cantidad: 20,
            nombreSigMenu: "Guia Espiritual 2",
            colorSigMenu: "green",
        },
        {
            name: '3',
            colorBorder: "yellow",
            cantidad: 5,
            nombreSigMenu: "Guia Espiritual 3",
            colorSigMenu: "green",
        },
        {
            name: '4',
            colorBorder: "blue",
            cantidad: 12,
            nombreSigMenu: "Guia Espiritual 4",
            colorSigMenu: "green",
        },
        {
            name: '5',
            colorBorder: "blueLight",
            cantidad: 4,
            nombreSigMenu: "Guia Espiritual 5",
            colorSigMenu: "green",
        },
        {
            name: '6',
            colorBorder: "orange",
            cantidad: 8,
            nombreSigMenu: "Guia Espiritual 6",
            colorSigMenu: "green",
        },
        {
            name: '7',
            colorBorder: "purple",
            cantidad: 3,
            nombreSigMenu: "Guia Espiritual 7",
            colorSigMenu: "green",
        },
        {
            name: '8',
            colorBorder: "white",
            cantidad: 1,
            nombreSigMenu: "Guia Espiritual 8",
            colorSigMenu: "green",
        },
        {
            name: '9',
            colorBorder: "red",
            cantidad: 10,
            nombreSigMenu: "Guia Espiritual 9",
            colorSigMenu: "green",
        }
    ];

    return <Background>
        <Container>
            <Title scale={1} color="white">CIRCULO BASE</Title>
            <Buttons petalos={petalos}/>
        </Container>
    </Background>;
}



const Title = styled(ResponsiveText)`
    letter-spacing: 15px;
    text-shadow: 0 0 10px rgba(0,0,0,0.5);
    margin-bottom: 20px;
`;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const Background = styled.div`
  background-color: #e0e0e0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

export default CirculoBase;