import styled from 'styled-components';
import {navigate} from "gatsby";
import FinishButton from "./FinishButton";
import ResponsiveText from "../apis/ResponsiveText";

const NavigationButtons = () => <>
    <Container>
        <BackButton color="white" onClick={()=> navigate(-1)}/>
        <NextButton color="white" onClick={()=> navigate(+1)}/>
    </Container>
</>

export const NavigationButtonsInLine = () => <>
    <ContainerInLine>
        <BackButtonInLine color="white" onClick={()=> navigate(-1)}/>
        <FinishButton/>
        <NextButtonInLine color="white" onClick={()=> navigate(+1)}/>
    </ContainerInLine>
    <GuiaButton onClick={()=>navigate('/circulo-base')}>
        <ResponsiveText scale={0.6} bold color={"#413f3f"}>
            FUENTE MADRE
        </ResponsiveText>
    </GuiaButton>
</>


const GuiaButton = styled.div`
  padding: 10px 20px;
  background-color: #fff7f7;
  border-radius: 10px;
  cursor: pointer;
  user-select: none;
  margin-bottom: 20px;
  
  :hover {
   filter: brightness(1.5);
  }
`;

const ContainerInLine = styled.div`
  display: flex;
  gap: 50px;
`;

const Button = styled.div`
  width: 0;
  height: 0;
  border-top: 35px solid transparent;
  border-bottom: 35px solid transparent;
  user-select: none;
  cursor: pointer;
`;

const ButtonInLine = styled.div`
  width: 0;
  height: 0;
  border-top: 25px solid transparent;
  border-bottom: 25px solid transparent;
  user-select: none;
  cursor: pointer;
`;

export const NextButtonInLine = styled(ButtonInLine)`
  border-left: 35px solid ${props => props.color};
`;

export const BackButtonInLine = styled(ButtonInLine)`
  border-right: 35px solid ${props => props.color};
`;

const ButtonCustom = styled(Button)`

  @media (max-width: 370px) {
    border-top: 23px solid transparent;
    border-bottom: 23px solid transparent;
  }
  
  @media (max-width: 410px) and (min-width: 370px) {
    border-top: 25px solid transparent;
    border-bottom: 25px solid transparent;
  }
  
  @media (max-width: 620px) and (min-width: 410px) {
    border-top: 30px solid transparent;
    border-bottom: 30px solid transparent;
  }
`;

export const BackButton = styled(ButtonCustom)`
  border-right: 50px solid ${props => props.color};
  
  @media (max-width: 370px) {
    border-right: 33px solid ${props => props.color};
  }

  @media (max-width: 410px) and (min-width: 370px) {
    border-right: 35px solid ${props => props.color};
  }

  @media (max-width: 620px) and (min-width: 410px) {
    border-right: 40px solid ${props => props.color};
  }
`;

export const NextButton = styled(ButtonCustom)`
  border-left: 50px solid ${props => props.color};

  @media (max-width: 370px) {
    border-left: 33px solid ${props => props.color};
  }
  
  @media (max-width: 410px) and (min-width: 370px) {
    border-left: 35px solid ${props => props.color};
  }

  @media (max-width: 620px) and (min-width: 410px) {
    border-left: 40px solid ${props => props.color};
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 350px;

  @media (max-width: 370px) {
    width: 180px;
  }
  
  @media (max-width: 410px) and (min-width: 370px) {
    width: 210px;
  }

  @media (max-width: 465px) and (min-width: 410px) {
    width: 250px;
  }

  @media (max-width: 540px) and (min-width: 465px) {
    width: 270px;
  }

  @media (max-width: 620px) and (min-width: 540px) {
    width: 300px;
  }
`;

export default NavigationButtons;