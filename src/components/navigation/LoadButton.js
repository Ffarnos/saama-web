import styled from 'styled-components';
import {navigate} from "gatsby";
import ResponsiveText from "../apis/ResponsiveText";
import createAndSendPDF from "../apis/pdf-email";


export const LoadButton = () => <Load>
      <LoadB src="/images/simbolos/guardado.png" alt="Guardar" title="Guardar como PDF" onClick={handlePDF} />
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
  pointer-events: auto;
  z-index: 9999;
  align-self: flex-end;  /* 👈 Esto lo alinea a la izquierda dentro del contenedor */
  margin-top: 30px;
  margin-left: 20px;       /* opcional: separa del borde izquierdo */
  
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