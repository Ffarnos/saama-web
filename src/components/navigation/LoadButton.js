import styled from 'styled-components';
import {navigate} from "gatsby";
import ResponsiveText from "../apis/ResponsiveText";
import createAndSendPDF from "../apis/pdf-email";


export const LoadButton = () => <Load>
      <LoadB src="/images/simbolos/guardado.png" alt="Guardar" onClick={()=> {createAndSendPDF().then(r => console.log("PDF CREADO CORRECTAMENTE"))} } />
</Load>
;

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
`;

  export default LoadButton;