import ResponsiveText from "../apis/ResponsiveText";
import {useEffect} from "react";
import {navigate} from "gatsby";
import {NavigationButtonsInLine} from "../navigation/NavigationButtons";
import styled from "styled-components";
import ResponsiveImage from "../apis/ResponsiveImage";
import {Background} from "../Commons";
import LoginCheck from "../login/LoginCheck";


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
            else if (event.key === 'Spacebar')
                navigate("/intro-text")
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);


    const {desc, titleText, image, titlePage, imageBody, separation} = pageContext
    const imagePath = "/images/" + image + ".webp";
    const imageBodyPath = "/images/simbolos/" + imageBody;
    let textSeparate;
    let textComponents;
    if (separation) {
        textSeparate = desc.split(". ");
        textComponents = textSeparate.map((sentence, index) => (
            <ResponsiveText key={index} scale={0.5} color={"white"}>
                {sentence.replace(".", "")}
            </ResponsiveText>
        ));
    }
    return <LoginCheck>
        <Background style={{backgroundImage: `url(${imagePath})`}}>
            <Content>
                <ResponsiveText scale={0.9} color={"white"}>{titlePage}</ResponsiveText>
                <ResponsiveText scale={0.7} color={"white"}>{titleText}</ResponsiveText>
                {separation ? textComponents
                    : <Text scale={0.5} color={"white"}>{desc}</Text>}

                {imageBody && <BodyImage src={imageBodyPath} scale={4}/>}
                <Container>
                    <NavigationButtonsInLine/>
                </Container>
            </Content>
        </Background>
    </LoginCheck>
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
  height: 100%;
`;

const Container = styled.div`
  margin-top: auto;

  @media (max-width: 768px) { /* Ajusta el valor para dispositivos móviles */
    padding-bottom: 100px; /* Ajusta este valor según tus necesidades */
  }
`;


export default FinalPageTemplate;
