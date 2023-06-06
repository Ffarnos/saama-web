import * as React from "react"
import styled from 'styled-components';
import Buttons from "../components/Buttons";
import ResponsiveText from "../components/apis/ResponsiveText";
import {navigate} from "gatsby";
import {FinishButtonResponsive} from "../components/navigation/FinishButton";
import {Background} from "../components/templates/PetalosTemplate";

const CirculoBase = () => {
    const petalos = [
        {
            index: 0,
            colorBorder: "red",
        },
        {
            index: 1,
            colorBorder: "greenLight",
        },
        {
            index: 2,
            colorBorder: "yellow",
        },
        {
            index: 3,
            colorBorder: "blue",
        },
        {
            index: 4,
            colorBorder: "blueLight",
        },
        {
            index: 5,
            colorBorder: "orange",
        },
        {
            index: 6,
            colorBorder: "purple",
        },
    ];

    return <Background style={{backgroundImage: `url(/images/portada.webp)`}}>
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
            <FinishButtonResponsive />
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


export default CirculoBase;