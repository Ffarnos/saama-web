import * as React from "react"
import ResponsiveText from "../apis/ResponsiveText";
import {useEffect} from "react";
import {navigate} from "gatsby";
import {NavigationButtonsInLine} from "../navigation/NavigationButtons";
import styled from "styled-components";


const TextTemplate = ({ pageContext }) => {
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


    const { titlePage, desc, titleText, image} = pageContext
    const imagePath = "/images/"+ image + ".webp";
    return <Background style={{backgroundImage: `url(${imagePath})`}}>
        <Content>
        <ResponsiveText scale={0.9} color={"white"}>{titlePage}</ResponsiveText>
        <ResponsiveText scale={0.7} color={"white"}>{titleText}</ResponsiveText>
        <ResponsiveText scale={0.5} color={"white"}>{desc}</ResponsiveText>
        <Container>
            <NavigationButtonsInLine/>
        </Container>
        </Content>
    </Background>
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`;

const Container = styled.div`
  display: flex;
  justify-content: center; /* Cambiamos a center para centrar los botones */
  align-items: center;
  margin-top: auto;
`;

const Background = styled.div`
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
    background-color: #888888; /* Color del thumb de la scrollbar */
    border-radius: 2px;
  }
`;
export default TextTemplate;
