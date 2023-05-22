import * as React from "react"
import styled from 'styled-components';
import ResponsiveText from "./ResponsiveText";

const Buttons = ({petalos,bigButtonTitle}) => {
    return (
        <ButtonsContainerCenter>
            <ButtonBig>
                <ResponsiveText scale={0.55} color={"#6e6e6e"}>
                    {bigButtonTitle}
                </ResponsiveText>
            </ButtonBig>
            <ButtonsContainer>
                {petalos.map((petalo) => (
                    <Button
                        onClick={() => console.log('click')}
                        bordercolor={getColorWithText(petalo.colorBorder)}
                        key={petalo.index}
                        style={generateCircleStyles(petalo.index, petalos.length)}
                    >
                        <ResponsiveText scale={0.8} color={'#6e6e6e'}>
                            {petalo.name}
                        </ResponsiveText>
                    </Button>
                ))}
            </ButtonsContainer>
        </ButtonsContainerCenter>
    );
};

const resizeObserver = new ResizeObserver(entries => {
    for (let entry of entries) {
        handleScreenResize();
    }
});


function handleScreenResize() {
    window.location.reload();
}


const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ButtonsContainerCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
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

const generateCircleStyles = (index, totalCircles) => {
    const angle = (index / totalCircles) * 360; // Calcular el ángulo de posición
    let radius = 220; // Radio del círculo grande
    let circleSize = 80; // Tamaño de los círculos pequeños

    if (window.innerWidth <= 420) {
        circleSize = 40;
        radius = 140;
    }
    else if (window.innerWidth <= 490) {
        circleSize = 50;
        radius = 170;
    }
    else if (window.innerWidth <= 560) {
        circleSize = 70
        radius = 190;
    }


    const centerX = -circleSize / 2; // Posición X del centro del contenedor (ajustado mediante translate)
    const centerY = -circleSize / 2; // Posición Y del centro del contenedor (ajustado mediante translate)

    const x = Math.cos((angle * Math.PI) / 180) * radius;
    const y = Math.sin((angle * Math.PI) / 180) * radius;

    return {
        top: `${centerY + y}px`,
        left: `${centerX + x}px`,
        width: `${circleSize}px`,
        height: `${circleSize}px`,
    };
};

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

  margin-left: 17px;

  @media (max-width: 380px) {
    width: 110px;
    height: 110px;
  }

  @media (max-width: 450px) and (min-width: 380px) {
    width: 130px;
    height: 130px;
  }

  @media (max-width: 520px) and (min-width: 450px) {
    width: 150px;
    height: 150px;
  }
`;



const Button = styled.div`
  background-color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: absolute;
  user-select: none;
  border: 7px solid ${props => props.bordercolor};
  box-shadow: inset 0 5px 8px 0 rgba(56, 55, 55, 0.75),
  0 5px 8px 0 rgba(0, 0, 0, 0.75);

  :hover {
    filter: brightness(0.6);
  }

`;



export default Buttons;