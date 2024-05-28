import ResponsiveText from "../apis/ResponsiveText";
import {useEffect, useState} from "react";
import {navigate} from "gatsby";
import {NavigationButtonsInLine} from "../navigation/NavigationButtons";
import styled from "styled-components";
import ResponsiveImage from "../apis/ResponsiveImage";
import {Background} from "../Commons";
import LoginCheck from "../login/LoginCheck";
import createAndSendPDF from "../apis/pdf-email";
import {TextField} from "@mui/material";


const FinalPageTemplate = ({ pageContext }) => {

    const [isTextFieldFocused, setIsTextFieldFocused] = useState(false);


    useEffect(() => {
        const handleKeyDown = (event) => {
            if (isTextFieldFocused) return

            if (event.altKey) {
                if (event.key === 'Control') {
                    createAndSendPDF().then(r => console.log("PDF CREADO CORRECTAMENTE"))
                }
                else {
                    let history = localStorage.getItem("history");

                    if (!history) history = [];
                    else history = JSON.parse(history);
                    if (event.key === 'r') {
                        history.push("ramificar");
                    } else if (event.key === 'b') {
                        history.remove(history.length-1);
                        navigate(-1)
                    }

                    localStorage.setItem("history", JSON.stringify(history));
                }

            }
            else if (event.key === 'Enter')
                navigate("/circulo-base")
            else if (event.ctrlKey && event.key === 'Backspace')
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


    const {desc, titleText, image, titlePage, imageBody, separation, fieldText} = pageContext
    const imagePath = "/images/" + image + ".webp";
    const imageBodyPath = "/images/simbolos/" + imageBody;
    let textSeparate;
    let textComponents;
    if (separation) {
        textSeparate = desc.split(". ");
        textComponents = textSeparate.map((sentence, index) => {
            return <div>
                <ResponsiveText key={index} scale={0.5} color={"white"}>
                    {sentence.replace(".", "")}
                </ResponsiveText>
            </div>
        });
    }
    return <LoginCheck>
        <Background style={{backgroundImage: `url(${imagePath})`}}>
            <Content>
                <ResponsiveText scale={0.9} color={"white"}>{titlePage}</ResponsiveText>
                <ResponsiveText scale={0.7} color={"white"}>{titleText}</ResponsiveText>
                {separation ? textComponents
                    : <Text scale={0.5} color={"white"}>{desc}</Text>}

                {fieldText && <div>
                    <TextField id="emocion" label="Emocion" variant="filled" margin="normal"
                               onChange={(e) => {
                                   let emotions = localStorage.getItem("history");

                                   if (!emotions)
                                       emotions = [];
                                   else
                                       emotions = JSON.parse(emotions);

                                   const lastEmotion = emotions[emotions.length - 1];
                                   const lastEmotionLink = lastEmotion.split(", ")[0];

                                   emotions[emotions.length - 1] = lastEmotionLink + ", " + e.target.value;

                                   localStorage.setItem("history", JSON.stringify(emotions));
                               }}
                               onFocus={() => setIsTextFieldFocused(true)}
                               onBlur={() => setIsTextFieldFocused(false)}
                               sx={{
                                   backgroundColor: 'white',
                                   '&:hover': {
                                       backgroundColor: 'white',
                                   },
                                   '&.Mui-focused': {
                                       backgroundColor: 'white',
                                   },
                                   '& .MuiFilledInput-root': {
                                       backgroundColor: 'white'
                                   }
                               }}
                    />
                </div>}
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
