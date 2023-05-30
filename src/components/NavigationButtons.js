import * as React from "react"
import styled from 'styled-components';
import {navigate} from "gatsby";

const NavigationButtons = () => <>
    <Container>
        <BackButton onClick={()=> navigate(-1)}/>
        <NextButton onClick={()=> navigate(+1)}/>
    </Container>
</>


const Button = styled.div`
  width: 0;
  height: 0;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
  user-select: none;
  cursor: pointer;

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

const BackButton = styled(Button)`
  border-right: 30px solid white;
  
  @media (max-width: 465px) {
    border-right: 15px solid white;
  }

  @media (max-width: 540px) and (min-width: 465px) {
    border-right: 20px solid white;
  }

  @media (max-width: 620px) and (min-width: 540px) {
    border-right: 25px solid white;
  }
`;

const NextButton = styled(Button)`
  border-left: 30px solid white;
  
  @media (max-width: 465px) {
    border-left: 15px solid white;
  }

  @media (max-width: 540px) and (min-width: 465px) {
    border-left: 20px solid white;
  }

  @media (max-width: 620px) and (min-width: 540px) {
    border-left: 25px solid white;
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