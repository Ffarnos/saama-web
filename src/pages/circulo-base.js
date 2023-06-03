import * as React from "react"
import styled from 'styled-components';
import Buttons from "../components/Buttons";
import ResponsiveText from "../components/apis/ResponsiveText";
import backgroundImage from '../../static/images/portada.webp';
import {navigate} from "gatsby";
import FinishButton from "../components/navigation/FinishButton";

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
            <Title scale={0.8} color={"#fffdfd"}>
                CIRCULO BASE
            </Title>
            <Buttons
                petalos={petalos}
                bigButtonTitle={"FUENTE GUÍA"}
                numbers={11}
                circuloBase={true}
                onClick={(petaloName)=> {
                    navigate('/circulo-base/petalo-' + petaloName)
                }}
            />
            <FinishButton/>
        </Container>
    </Background>;
}



const Title = styled(ResponsiveText)`
    letter-spacing: 15px;
    text-shadow: 0 0 10px rgba(0,0,0,0.5);
    margin-bottom: -30px;
`;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const Background = styled.div`
  background-image: url(${backgroundImage});
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

export default CirculoBase;