import * as React from "react"
import styled from 'styled-components';
import ResponsiveText from "./ResponsiveText";

const Buttons = ({petalos}) => {

    return <ButtonsContainerCenter>
        <ButtonsContainer>
            {petalos.map((petalo) => (
                <Button onClick={() => console.log("click")} bordercolor={getColorWithText(petalo.colorBorder)}>
                    <ResponsiveText scale={0.8} color={"white"}> {petalo.name} </ResponsiveText>
                </Button>
            ))}

        </ButtonsContainer>
    </ButtonsContainerCenter>
}

const ButtonsContainerCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 75%;
  width: 100%;
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

const Button = styled.div`
  background-color: #b6b6b6;
  background-image: linear-gradient(90deg, #b6b6b6 0%, #e0e0e0 60%);
  border-radius: 50%;
  width: 100px;
  height: 100px;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;
  border: 7px solid ${props => props.bordercolor};
  box-shadow:
          inset 0 0 0 1.5px #ffffff,
          0 5px 8px 0 rgba(0, 0, 0, 0.75);

  :hover {
    filter: brightness(1.5);
  }
`;



export default Buttons;