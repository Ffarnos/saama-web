import * as React from "react"
import styled from 'styled-components';
import backgroundImage from '../../static/images/portada.webp';
import ResponsiveText from "../components/ResponsiveText";
import {navigate} from "gatsby";
import {useEffect} from "react";
import useInstall from "../components/UseInstall";


const Index = () => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter')
        navigate("/circulo-base")
      else if (event.key === 'Backspace')
        navigate("/")
      else if (event.key === 'ArrowLeft')
        navigate(-1)
      else if (event.key === 'ArrowRight')
        navigate(+1)
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return <Background>
    <ContainerInstall>
      <MinimalisticInstallButton/>
    </ContainerInstall>
    <MinimalisticInstallButton/>
    <Container>
      <CenterContainer>
        <TerapiaText scale={1.5}>
          TERAPIA
        </TerapiaText>
        <TerapiaText scale={0.9}>
          CUÁNTICA
        </TerapiaText>
        <TerapiaText scale={1.8}>
          GÉNESIS
        </TerapiaText>
        <StartButton onClick={()=>navigate('/circulo-base')}>
          <ResponsiveText scale={0.6} bold color={"#1f1e1e"}>
            INICIAR CONEXION
          </ResponsiveText>
        </StartButton>
      </CenterContainer>
    </Container>

  </Background>;
}

const ContainerInstall = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
`;

const MinimalisticInstallButton = () => {
  const [canInstall, install] = useInstall();
  return canInstall && <StyledMinimalisticInstallButton onClick={install}>
    <ButtonText scale={0.3} bold>Instalar</ButtonText>
  </StyledMinimalisticInstallButton>
}

const ButtonText = styled(ResponsiveText)`
    padding: 9px 22px;
`;

const StyledMinimalisticInstallButton = styled.div`
  cursor: pointer;
  color: white;
  margin-right: 5px;
  user-select: none;
  border-radius: 8px;
  background-color: #50d757;
  padding: 10px 20px;
  
`;

const TerapiaText = styled(ResponsiveText)`
  margin-bottom: 20px;
  letter-spacing: 15px;
  color: white;
`;

const Background = styled.div`
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: -1;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const CenterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

`;

const StartButton = styled.div`
  background-color: #eeeeee;
  border-radius: 5px;
  padding: 10px 20px;
  user-select: none;
  cursor: pointer;

  :hover {
    filter: brightness(1.8);
  }
`;

export default Index;
