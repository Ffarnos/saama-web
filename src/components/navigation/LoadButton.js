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
        <LoadB src="/images/simbolos/descarga.png" alt="GuardarPDF" title="Guardar como PDF" onClick={handlePDF} />
        <LoadB src="/images/simbolos/inicio.png" alt="Inicio" title="Inicio" onClick={() => navigate('/')} />
        <LoadB src="/images/simbolos/oraciones.png" alt="Oraciones" title="Oraciones" onClick={() => navigate("/intro-text")} />
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
    align-items:center ;
    padding-bottom: 100px; /* deja espacio para botones en mobile si querés */
    
  }
`;

const Toggle = styled.button`
  position: fixed;
  bottom: 15px;
  right: 15px;
  z-index: 10000;

  background-color: white;
  border: none;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;

  box-shadow: 0 0 10px rgba(0,0,0,0.2);
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 600px) {
    display: none; /* Oculta el toggle en pantallas grandes */
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
  width: 60px;
  height: 60px;
  cursor: pointer;
  background-color: white;
  padding: 1px;
  margin: 5px;
  border-radius: 50%;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow:
      0 0 10px white,
      0 0 10px white,
      0 0 10px white,
      0 0 10px #ffffff,
      0 0 10px #ffffff;
  }
`;

  export default LoadButton;