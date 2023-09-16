import styled from 'styled-components';

const ResponsiveText = styled(
    ({scale, bold, center, right, left, color, ...rest}) => <div {...rest} />)`
  font-size: ${props => props.scale * 50}px;
  color: ${props => props.color ? props.color : 'black'};
  @media (max-width: 750px) {
    font-size: calc(${props  => props.scale * 3}vw + ${props => props.scale *
            25}px);
  }

  @media (max-width: 300px) {
    font-size: ${props => props.scale * 11}vw;
  }

  font-weight: ${props => props.bold ? 'bold' : 'normal'};
  text-align: ${props =>
          props.right
          ? 'right'
          : props.left 
          ? 'left'
          : 'center'};

`;

export default ResponsiveText;
