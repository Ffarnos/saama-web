import styled from 'styled-components';
import Buttons from "../components/Buttons";
import ResponsiveText from "../components/apis/ResponsiveText";
import {navigate} from "gatsby";
import LoginCheck from "../components/login/LoginCheck";
import {Background} from "../components/Commons";
import historySave from "../components/navigation/History";
import {Alert} from "@mui/material";
import {useState} from "react";
const createdPages = require('../../../createdPages.json');

const CirculoBase = () => {
    const [showAlert, setShowAlert] = useState(false);

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
                {showAlert && <ContainerAlert>
                    <Alert severity="error">
                        La pagina solicitada no existe
                    </Alert>
                </ContainerAlert>}
                <Buttons
                    petalos={petalos}
                    bigButtonTitle={"FUENTE MADRE"}
                    numbers={11}
                    circuloBase={true}
                    onClick={(petaloName) => {
                        const newLink = 'circulo-base/petalo-' + petaloName;
                        if (!createdPages.includes(newLink)) {
                            setShowAlert(true);
                            setTimeout(() => setShowAlert(false), 2000);
                            return 0;
                        } else {
                            navigate('/circulo-base/petalo-' + petaloName)
                            historySave("/petalo-" + petaloName)
                        }
                    }}
                />
                
            </Container>
        </Background>
    </LoginCheck>;
}


const ContainerAlert = styled.div`
  position: absolute;
  left: 20px;
  top: 20px;
  z-index: 999;
`;

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