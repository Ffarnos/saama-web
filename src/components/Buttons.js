import styled from 'styled-components';
import ResponsiveText from "./apis/ResponsiveText";
import NavigationButtons from "./navigation/NavigationButtons";
import {navigate} from "gatsby";
import {useEffect} from "react";

const Buttons = ({petalos,bigButtonTitle,circuloBase,onClick, noNumber}) => {
    useEffect(() => {
        const handleKeyDown = (event) => {
            switch (event.key) {
                case 'Enter':
                    navigate("/circulo-base");
                    break;
                case 'Backspace':
                    navigate("/");
                    break;
                case 'ArrowLeft':
                    navigate(-1);
                    break;
                case 'ArrowRight':
                    navigate(+1);
                    break;
                default:
                    if (/^[0-9]$/.test(event.key)) {
                        onClick(parseInt(event.key));
                    }
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClick]);


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
                        onClick={()=>onClick(petalo.index + 1)}
                        bordercolor={getColorWithText(petalo.colorBorder)}
                        key={petalo.index}
                        angle={(petalo.index / (noNumber ? petalos.length+2 : 11)) * 360}
                    >
                        <ResponsiveText scale={0.8} color={'#6e6e6e'}>
                            {noNumber ? petalo.title : petalo.index + 1}
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
  
  @media (min-height: 600px) and (max-width: 539px) {
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
    width: 90px;
    height: 90px;
  }
  @media (max-width: 410px) and (min-width: 370px) {
    width: 120px;
    height: 120px;
  }
  
  @media (max-width: 465px) and (min-width: 410px) {
    width: 140px;
    height: 140px;
  }

  @media (max-width: 540px) and (min-width: 465px) {
    width: 160px;
    height: 160px;
  }

  @media (max-width: 620px) and (min-width: 540px) {
    width: 180px;
    height: 180px;
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

  ${props => {
    const px = 230;
    const top = (-85 / 2) + calculatePositionCos(props.angle, px);
    const sin = (-85 / 2) + calculatePositionSin(props.angle, px);
    return `
      top: ${top}px;
      left: ${sin}px;
    `;
  }}

  width: 85px;
  height: 85px;

  @media (max-width: 370px) {
    ${props => {
      const px = 120;
      const top = (-40 / 2) + calculatePositionCos(props.angle, px);
      const sin = (-40 / 2) + calculatePositionSin(props.angle, px);
      return `
      top: ${top}px;
      left: ${sin}px;
    `;
    }}
    width: 40px;
    height: 40px;
  }

  @media (max-width: 410px) and (min-width: 370px) {
    ${props => {
      const px = 140;
      const top = (-60 / 2) + calculatePositionCos(props.angle, px);
      const sin = (-60 / 2) + calculatePositionSin(props.angle, px);
      return `
      top: ${top}px;
      left: ${sin}px;
    `;
    }}
    width: 60px;
    height: 60px;
  }

  @media (max-width: 465px) and (min-width: 410px) {
    ${props => {
      const px = 160;
      const top = (-60 / 2) + calculatePositionCos(props.angle, px);
      const sin = (-60 / 2) + calculatePositionSin(props.angle, px);
      return `
      top: ${top}px;
      left: ${sin}px;
    `;
    }}
    width: 60px;
    height: 60px;
  }

  @media (max-width: 540px) and (min-width: 465px) {
    ${props => {
      const px = 180;
      const top = (-80 / 2) + calculatePositionCos(props.angle, px);
      const sin = (-80 / 2) + calculatePositionSin(props.angle, px);
      return `
      top: ${top}px;
      left: ${sin}px;
    `;
    }}
    width: 80px;
    height: 80px;
  }

  @media (max-width: 620px) and (min-width: 540px){
    ${props => {
      const px = 210;
      const top = (-90 / 2) + calculatePositionCos(props.angle, px);
      const sin = (-90 / 2) + calculatePositionSin(props.angle, px);
      return `
      top: ${top}px;
      left: ${sin}px;
    `;
    }}
    width: 90px;
    height: 90px;
  }
  
  :hover {
    filter: brightness(0.6);
  }

`;

function calculatePositionCos(angle, px) {
    return Math.cos((angle * pi) / 180) * px;
}

function calculatePositionSin(angle, px) {
    return Math.sin((angle * pi) / 180) * px;
}

export default Buttons;