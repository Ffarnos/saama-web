import * as React from "react"
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
  border-top: 25px solid transparent;
  border-bottom: 25px solid transparent;
  user-select: none;
  cursor: pointer;
`;


export const NextButtonInLine = styled(Button)`
  border-left: 30px solid ${props => props.color};
`;

export const BackButtonInLine = styled(Button)`
  border-right: 30px solid ${props => props.color};
`;

const ButtonCustom = styled(Button)`
  @media (max-width: 370px) {
    border-top: 9px solid transparent;
    border-bottom: 9px solid transparent;
  }

  @media (max-width: 410px) and (min-width: 370px) {
    border-top: 11px solid transparent;
    border-bottom: 11px solid transparent;
  }

  @media (max-width: 465px) and (min-width: 410px) {
    border-top: 14px solid transparent;
    border-bottom: 14px solid transparent;
  }

  @media (max-width: 540px) and (min-width: 465px) {
    border-top: 17px solid transparent;
    border-bottom: 17px solid transparent;
  }
`;

export const BackButton = styled(ButtonCustom)`
  border-right: 30px solid ${props => props.color};
  
  @media (max-width: 465px) {
    border-right: 15px solid ${props => props.color};
  }

  @media (max-width: 540px) and (min-width: 465px) {
    border-right: 20px solid ${props => props.color};
  }

  @media (max-width: 620px) and (min-width: 540px) {
    border-right: 25px solid ${props => props.color};
  }
`;

export const NextButton = styled(ButtonCustom)`
  border-left: 30px solid ${props => props.color};
  
  @media (max-width: 465px) {
    border-left: 15px solid ${props => props.color};
  }

  @media (max-width: 540px) and (min-width: 465px) {
    border-left: 20px solid ${props => props.color};
  }

  @media (max-width: 620px) and (min-width: 540px) {
    border-left: 25px solid ${props => props.color};
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