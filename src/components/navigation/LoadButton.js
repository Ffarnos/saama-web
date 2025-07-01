import { useState } from 'react';
import styled from 'styled-components';
import { navigate } from "gatsby";
import createAndSendPDF from "../apis/pdf-email";

export const LoadButton = () => {
  const [open, setOpen] = useState(false);

  const handlePDF = () => {
    createAndSendPDF().then(() => console.log("PDF CREADO CORRECTAMENTE"));
  };

  return (
    <Container>
      <Toggle onClick={() => setOpen(!open)}>
      {open ? '✖' : '☰'}
      </Toggle>

      <LoadButtons $open={open}>
        <LoadB src="/images/simbolos/guardado.png" alt="GuardarPDF" title="Guardar como PDF" onClick={handlePDF} />
        <LoadB src="/images/simbolos/proximo.png" alt="Inicio" title="Inicio" onClick={() => navigate('/')} />
      </LoadButtons>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: flex-end; /* 👈 lo alinea a la derecha */
  align-items: center;
  gap: 10px;
  width: 100%;  /* para ocupar el ancho completo del contenedor padre */
  margin-top: auto;

  @media (max-width: 600px) {
    padding-bottom: 80px; /* deja espacio para botones en mobile si querés */
    
  }
`;

const Toggle = styled.button`
  background-color: white;
  border: none;
  border-radius: 50%;
  padding: 10px 15px;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0,0,0,0.2);

  @media (min-width: 600px) {
    display: none;
  }
`;

const LoadButtons = styled.div`
  display: ${props => props.$open ? "flex" : "none"};
  flex-direction: row;
  gap: 10px;
  margin-top: 10px;

  @media (min-width: 600px) {
    display: flex;
    margin-top: 0;
  }
`;

const LoadB = styled.img`
  width: 50px;
  height: 50px;
  cursor: pointer;
  background-color: white;
  padding: 1px;
  border-radius: 50%;
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