import * as React from "react"
import styled from 'styled-components';
import {navigate} from "gatsby";
import ResponsiveText from "../apis/ResponsiveText";

const FinishButton = () => <Finish onClick={()=>navigate('/')} style={{marginBottom: "20px"}}>
    <ResponsiveText scale={0.5} bold color={"#413f3f"}>
        FIN
    </ResponsiveText>
</Finish>

export const FinishButtonResponsive = () => <FinishResponsive onClick={()=>navigate('/')}>
        <ResponsiveText scale={0.5} bold color={"#413f3f"}>
            FIN
        </ResponsiveText>
</FinishResponsive>
;

const Finish = styled.div`
  background-color: #fff7f7;
  padding: 10px 50px;
  border-radius: 10px;
  cursor: pointer;
  user-select: none;
  :hover {
    filter: brightness(1.5);
  }
`;

const FinishResponsive = styled(Finish)`
  @media (min-height: 1300px) {
    margin-top: -180px;
  }

  @media (min-height: 840px) and (max-height: 1150px) {
    margin-top: -150px;
  }

  
  @media (min-height: 650px) and (max-height: 840px) and (max-width: 539px) {
    margin-top: -70px;
  }
  
  
  @media (max-width: 370px) {
    padding: 5px 40px;
  }
`;

export default FinishButton;