import styled from 'styled-components';
import Buttons from "../components/Buttons";
import ResponsiveText from "../components/apis/ResponsiveText";
import {navigate} from "gatsby";
import {FinishButtonResponsive} from "../components/navigation/FinishButton";
import LoginCheck from "../components/login/LoginCheck";

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

    return <LoginCheck>
        <Background style={{backgroundImage: `url(/images/portada.webp)`}}>
            <Container>
                <Title scale={0.8} color={"#fffdfd"}>
                    Terapia GENESÍS
                </Title>
                <Buttons
                    petalos={petalos}
                    bigButtonTitle={"FUENTE MADRE"}
                    numbers={11}
                    circuloBase={true}
                    onClick={(petaloName) => {
                        navigate('/circulo-base/petalo-' + petaloName)
                    }}
                />
                <FinishButtonResponsive/>
            </Container>
        </Background>
    </LoginCheck>;
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
    background-color: #888888;
    border-radius: 2px;
  }
`;
export default CirculoBase;