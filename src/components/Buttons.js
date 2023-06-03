import * as React from "react"
import styled from 'styled-components';
import ResponsiveText from "./apis/ResponsiveText";
import NavigationButtons from "./navigation/NavigationButtons";
import {navigate} from "gatsby";
import {useEffect} from "react";

const Buttons = ({petalos,bigButtonTitle,circuloBase,onClick}) => {
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


        return (
        <ButtonsContainerCenter>
            <ButtonBig onClick={()=>navigate("/circulo-base")}>
                <ResponsiveText scale={0.55} color={"#6e6e6e"}>
                    {bigButtonTitle}
                </ResponsiveText>
            </ButtonBig>
            <ButtonsContainer>
                {circuloBase && petalos.map((petalo) => (
                    <Button
                        onClick={()=>onClick(petalo.name)}
                        bordercolor={getColorWithText(petalo.colorBorder)}
                        key={petalo.index}
                        angle={(petalo.index / 11) * 360}
                    >
                        <ResponsiveText scale={0.8} color={'#6e6e6e'}>
                            {petalo.name}
                        </ResponsiveText>
                    </Button>
                ))}
                {!circuloBase && Array.of(0,1,2,3,4,5,6,7,8,9).map((number) => (
                    <Button
                        onClick={()=>onClick(number)}
                        key={number}
                        bordercolor={getColorWithNumber(number)}
                        angle={(number / 10) * 360}
                    >
                        <ResponsiveText scale={0.8} color={'#6e6e6e'}>
                            {number}
                        </ResponsiveText>
                    </Button>
                    ))}

            </ButtonsContainer>
            <NavigationButtons/>
        </ButtonsContainerCenter>

    );
};

const ButtonsContainerCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
  
  @media (max-width: 540px) {
    margin-top: -70px;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;


const getColorWithText = (text) => {
    switch (text) {
        case "red":
            return "#c21212";
        case "yellow":
            return "#ced750";
        case "blue":
            return "#5052d7";
        case "green":
            return "#026908";
        case "orange":
            return "#d78850";
        case "purple":
            return "#a050d7";
        case "brown":
            return "#4f4421";
        case "greenLight":
            return "#50d757";
        case "blueLight":
            return "#5682be";
        case "yellowLight":
            return "#d7c450";
        case "redLight":
            return "#d75050";
        default:
            return "#ecc2e1";
    }
};

const getColorWithNumber = (number) => {
    switch (number) {
        case 1:
            return "#c21212";
        case 2:
            return "#ced750";
        case 3:
            return "#5052d7";
        case 4:
            return "#026908";
        case 5:
            return "#d78850";
        case 6:
            return "#a050d7";
        case 7:
            return "#4f4421";
        case 8:
            return "#50d757";
        case 9:
            return "#5682be";
        default:
            return "#ecc2e1";
    }
};

const ButtonBig = styled.div`
  background-color: #ffffff;
  border-radius: 50%;
  width: 220px;
  height: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: absolute;
  user-select: none;
  box-shadow: inset 15px 10px 20px 0 #ececec, 15px 10px 20px 0 rgba(154, 154, 154, 0.75);

  :hover {
    filter: brightness(0.6);
  }

  @media (max-width: 370px) {
    width: 120px;
    height: 120px;
  }
  @media (max-width: 410px) and (min-width: 370px) {
    width: 140px;
    height: 140px;
  }
  
  @media (max-width: 465px) and (min-width: 410px) {
    width: 160px;
    height: 160px;
  }

  @media (max-width: 540px) and (min-width: 465px) {
    width: 180px;
    height: 180px;
  }

  @media (max-width: 620px) and (min-width: 540px) {
    width: 200px;
    height: 200px;
  }
  
  
`;

let pi = 3.141592653589793;

const Button = styled.div`
  background-color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: absolute;
  user-select: none;
  box-shadow: 0 15px 15px 0 rgba(56, 56, 56, 0.75), 0 0 0 7px ${props => props.bordercolor};
  top: calc((-85px / 2) + (cos((${props => props.angle} * ${pi}) / 180) * 230px));
  left: calc((-85px / 2) + (sin((${props => props.angle} * ${pi}) / 180) * 230px));
  width: 85px;
  height: 85px;

  @media (max-width: 370px) {
    top: calc((-40px / 2) + (cos((${props => props.angle} * ${pi}) / 180) * 120px));
    left: calc((-40px / 2) + (sin((${props => props.angle} * ${pi}) / 180) * 120px));
    width: 40px;
    height: 40px;
  }

  @media (max-width: 410px) and (min-width: 370px) {
    top: calc((-60px / 2) + (cos((${props => props.angle} * ${pi}) / 180) * 140px));
    left: calc((-60px / 2) + (sin((${props => props.angle} * ${pi}) / 180) * 140px));
    width: 60px;
    height: 60px;
  }

  @media (max-width: 465px) and (min-width: 410px) {
    top: calc((-60px / 2) + (cos((${props => props.angle} * ${pi}) / 180) * 160px));
    left: calc((-60px / 2) + (sin((${props => props.angle} * ${pi}) / 180) * 160px));
    width: 60px;
    height: 60px;
  }

  @media (max-width: 540px) and (min-width: 465px) {
    top: calc((-80px / 2) + (cos((${props => props.angle} * ${pi}) / 180) * 180px));
    left: calc((-80px / 2) + (sin((${props => props.angle} * ${pi}) / 180) * 180px));
    width: 80px;
    height: 80px;
  }

  @media (max-width: 620px) and (min-width: 540px) {
    top: calc((-90px / 2) + (cos((${props => props.angle} * ${pi}) / 180) * 210px));
    left: calc((-90px / 2) + (sin((${props => props.angle} * ${pi}) / 180) * 210px));
    width: 90px;
    height: 90px;
  }

  :hover {
    filter: brightness(0.6);
  }

`;


export default Buttons;