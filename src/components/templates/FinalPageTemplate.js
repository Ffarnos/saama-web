import ResponsiveText from "../apis/ResponsiveText";
import {useEffect} from "react";
import {navigate} from "gatsby";
import {NavigationButtonsInLine} from "../navigation/NavigationButtons";
import styled from "styled-components";
import {Background} from "./PetalosTemplate";
import ResponsiveImage from "../apis/ResponsiveImage";


const FinalPageTemplate = ({ pageContext }) => {
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


    const {desc, titleText, image, titlePage, imageBody} = pageContext
    const imagePath = "/images/"+ image + ".webp";
    const imageBodyPath = "/images/simbolos/"+ imageBody;
    return <Background style={{backgroundImage: `url(${imagePath})`}}>
        <Content>
            <ResponsiveText scale={0.9} color={"white"}>{titlePage}</ResponsiveText>
            <ResponsiveText scale={0.7} color={"white"}>{titleText}</ResponsiveText>
            <Text scale={0.5} color={"white"}>{desc}</Text>
            {imageBody && <BodyImage src={imageBodyPath} scale={4}/>}
        <Container>
            <NavigationButtonsInLine/>
        </Container>
        </Content>
    </Background>
}
const BodyImage = styled(ResponsiveImage)`
  margin-top: 10px;
`;
const Text = styled(ResponsiveText)`
  padding-top: 30px
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`;

const Container = styled.div`
    margin-top: auto;
`;

export default FinalPageTemplate;
