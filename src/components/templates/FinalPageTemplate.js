import ResponsiveText from "../apis/ResponsiveText";
import {useEffect, useState} from "react";
import {navigate} from "gatsby";
import {NavigationButtonsInLine} from "../navigation/NavigationButtons";
import styled from "styled-components";
import ResponsiveImage from "../apis/ResponsiveImage";
import {Background} from "../Commons";
import LoginCheck from "../login/LoginCheck";
import createAndSendPDF from "../apis/pdf-email";
import {Alert, TextField} from "@mui/material";


const FinalPageTemplate = ({ pageContext }) => {

    const [isTextFieldFocused, setIsTextFieldFocused] = useState(false);
    const [showAlertRamificar, setShowAlertRamificar] = useState(false);
    const [showAlertBorrar, setShowAlertBorrar] = useState(false);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (isTextFieldFocused) return

             if (event.altKey) {
                 if (event.key === 'Control')
                     createAndSendPDF().then(r => console.log("PDF CREADO CORRECTAMENTE"))
                 else if (event.key === 'r' || event.key === 'R' || event.key === 'b' || event.key === 'B') {
                     let history = localStorage.getItem("history");

                     if (!history) history = [];
                     else history = JSON.parse(history);
                     if (event.key === 'r' || event.key === 'R') {
                         setShowAlertRamificar(true);
                         history.push("ramificar");
                         setTimeout(() => {
                             setShowAlertRamificar(false);
                         }, 4000);
                     } else if (event.key === 'b' || event.key === 'B') {
                         setShowAlertBorrar(true);
                         history.pop()
                         setTimeout(() => {
                             setShowAlertBorrar(false);
                         }, 4000);
                     }

                     localStorage.setItem("history", JSON.stringify(history));
                 } else if (event.key === 'Backspace')
                     navigate("/")
                 else if (event.key === 'o' || event.key === 'O')
                     navigate("/intro-text");
             }
             else if (event.key === 'Enter')
                 navigate("/circulo-base")
             else if (event.key === 'ArrowLeft')
                navigate(-1)
            else if (event.key === 'ArrowRight')
                navigate(+1)
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isTextFieldFocused, showAlertBorrar, showAlertRamificar, setShowAlertRamificar, setShowAlertBorrar]);



    const {desc, titleText, image, titlePage, imageBody, separation, fieldText, linkName} = pageContext
    const imagePath = "/images/" + image + ".webp";
    const imageBodyPath = "/images/simbolos/" + imageBody;

    const color = getColorWithFuente(linkName);
    let textSeparate;
    let textComponents;
    if (separation) {
        textSeparate = desc.split(". ");
        textComponents = textSeparate.map((sentence, index) => {
            return <div>
                <ResponsiveText key={index} scale={0.5} color={color}>
                    {sentence.replace(".", "")}
                </ResponsiveText>
            </div>
        });
    }
    return <LoginCheck>
        <Background style={{backgroundImage: `url(${imagePath})`}}>
            <Content>
                {showAlertRamificar && <ContainerAlert>
                    <Alert severity="success">
                        Ramificacion
                    </Alert>
                </ContainerAlert>}

                {showAlertBorrar && <ContainerAlert>
                    <Alert severity="success">
                        Punto borrado de la sesion
                    </Alert>
                </ContainerAlert>}
                <ResponsiveText scale={0.9} color={color}>{titlePage}</ResponsiveText>
                <ResponsiveText scale={0.7} color={color}>{titleText}</ResponsiveText>
                {separation ? textComponents
                    : <Text scale={0.5} color={color}>{desc}</Text>}

                {fieldText && <div>
                    <TextField id="emocion" variant="filled" margin="normal"
                               onChange={(e) => {
                                   let history = localStorage.getItem("history");

                                   if (!history)
                                       history = [];
                                   else
                                       history = JSON.parse(history);

                                   const lastLink = history[history.length - 1];
                                   const lastEmotionLink = lastLink.split(":")[0];

                                   history[history.length - 1] = lastEmotionLink + ":" + e.target.value;

                                   localStorage.setItem("history", JSON.stringify(history));
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

const getColorWithFuente = (link) => {
    const match = link.match(/petalo-(\d+)/);

    const number = parseInt(match[1]);

    switch (number) {
        case 5:
            return "#595959"
        default:
            return "white"

    }

}

const ContainerAlert = styled.div`
  position: absolute;
  left: 20px;
  top: 20px;
  z-index: 999;
`;


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
