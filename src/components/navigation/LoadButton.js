import styled from 'styled-components';
import {navigate} from "gatsby";
import createAndSendPDF from "../apis/pdf-email";


export const LoadButton = () => <Load>
      <LoadB src="/images/simbolos/guardado.png" alt="GuardarPDF" title="Guardar como PDF" onClick={handlePDF} />
      <LoadB src="/images/simbolos/proximo.png" alt="Inicio" title="Inicio" onClick={()=>navigate('/')} />
</Load>
;


const handlePDF = () => {
    createAndSendPDF().then(() => console.log("PDF CREADO CORRECTAMENTE"));
};



const Finish = styled.div`
 
  padding: 10px 50px;
  cursor: pointer;
  user-select: none;
 
`;

const Load = styled(Finish)`
  position: absolute;
  bottom: 0px;     /* distancia desde abajo */
  right: 1px;      /* distancia desde el borde derecho */
  z-index: 9999;

  display: flex;
  flex-direction: row;
  gap: 10px;
  pointer-events: auto;

`;

const LoadB = styled.img`
  width: 50px;
  height: 50px;
  cursor: pointer;
  background-color: white; /* ✅ Fondo blanco */
  padding: 1px;            /* opcional: separa la imagen del borde */
  border-radius: 50px;      /* opcional: bordes redondeados */
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow:
      0 0 10px white,
      0 0 20px white,
      0 0 30px white,
      0 0 40px #ffffff,
      0 0 50px #ffffff;
  }
`;



  export default LoadButton;