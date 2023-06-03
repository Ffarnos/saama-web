import * as React from "react"
import styled from 'styled-components';
import {navigate} from "gatsby";
import ResponsiveText from "../apis/ResponsiveText";

const FinishButton = () => <Finish onClick={()=>navigate('/')}>
    <ResponsiveText scale={0.5} bold color={"#413f3f"}>
        FIN
    </ResponsiveText>
</Finish>

const Finish = styled.div`
  background-color: #fff7f7;
  padding: 10px 50px;
  border-radius: 10px;
  cursor: pointer;
  user-select: none;

  @media (max-width: 370px) {
    padding: 5px 40px;
  }
  
  @media (max-width: 540px) {
    margin-top: -70px;
  }
`;

export default FinishButton;