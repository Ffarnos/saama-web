import React from 'react';
import styled from "styled-components";
import ResponsiveText from "./ResponsiveText";
import useInstall from "./UseInstall";

const InstallButton = () => {
    const [canInstall, install] = useInstall();

    return canInstall && <StyledMinimalisticInstallButton onClick={install}>
        <ButtonText scale={0.3} bold>Instalar</ButtonText>
    </StyledMinimalisticInstallButton>;
};

const ButtonText = styled(ResponsiveText)`
    padding: 9px 22px;
`;

const StyledMinimalisticInstallButton = styled.div`
  cursor: pointer;
  color: white;
  margin-right: 5px;
  user-select: none;
  border-radius: 8px;
  margin-left: 30px;
  border: double 1px transparent;
  background-image: linear-gradient(30deg, #3e1b38, #184153), linear-gradient(30deg, #f93fff, #0abbff);
  background-origin: border-box;
  background-clip: content-box, border-box;

  :hover {
    background-image: linear-gradient(30deg, #531f4a, #1d5269), linear-gradient(30deg, #f957ff, #25bffa);
  }

  h2 {
    margin: 0;
    padding: 20px;
  }
`;


export default InstallButton;