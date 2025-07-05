import { useState } from 'react';
import styled from 'styled-components';
import { navigate } from "gatsby";
import createAndSendPDF from "../apis/pdf-email";
import { Alert } from "@mui/material";


export const LoadButton = () => {
  const [open, setOpen] = useState(false);
  const [showAlertBorrar, setShowAlertBorrar] = useState(false);

  const handlePDF = () => {
    createAndSendPDF().then(() => console.log("PDF CREADO CORRECTAMENTE"));
  };
  const handleDeleteHistoryItem = () => {
  let history = localStorage.getItem("history");
  let parsedHistory = [];

  if (history) {
    try {
      parsedHistory = JSON.parse(history);
    } catch (e) {
      console.error("Historial corrupto:", e);
    }
  }

  if (parsedHistory.length > 0) {
    parsedHistory.pop();
    localStorage.setItem("history", JSON.stringify(parsedHistory));
  }

  setShowAlertBorrar(true);
  setTimeout(() => {
    setShowAlertBorrar(false);
  }, 4000);
};
/**history = lo que tenés guardado (los pasos que diste: PDF, pétalos tocados, etc.).
  parsedHistory = esa historia, transformada en un array que podés manipular.
  pop() = borra el último paso que hiciste.
  setItem = guarda la nueva historia sin ese paso.
setShowAlertBorrar(true) = muestra un cartel de "Punto borrado". 
  
  1-Obtienen el historial desde localStorage.
  2-Lo convierten a un array con JSON.parse().
  3-Hacen pop() para borrar el último elemento.
  3-Lo guardan nuevamente en localStorage.*/
  return (
    <Container>
      <Toggle onClick={() => setOpen(!open)}>
        {open ? '✖' : '☰'}
      </Toggle>

      <LoadButtons $open={open}>
        <LoadB src="/images/simbolos/descarga2.png" alt="GuardarPDF" title="Guardar como PDF" onClick={handlePDF} />
        <LoadB src="/images/simbolos/borrado.png" alt="Borrar Ultimo" title="Borrar Ultimo" onClick={handleDeleteHistoryItem} />
        <LoadB src="/images/simbolos/oraciones2.png" alt="Oraciones" title="Oraciones" onClick={() => navigate("/intro-text")} />
        <LoadB src="/images/simbolos/inicio2.png" alt="Inicio" title="Inicio" onClick={() => navigate('/')} />
      </LoadButtons>

      {showAlertBorrar && <ContainerAlert>
        <Alert severity="success">
          Punto borrado de la sesion
        </Alert>
      </ContainerAlert>}



    </Container>


  );
};

const ContainerAlert = styled.div`
  position: absolute;
  left: 20px;
  top: 20px;
  z-index: 999;
`;

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
  width: 55px;
  height: 55px;
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