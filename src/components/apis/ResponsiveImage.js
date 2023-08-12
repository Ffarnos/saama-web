import styled from 'styled-components';

const ResponsiveImage = styled(({...props}) => <img alt="responsive-image" {...props}/>)`
  width: ${props => props.scale * 50}px;
  height: ${props => props.scale * 50 * props.hw}px;
  
  @media (max-width: 750px) {
    width: calc(${props => props.scale * 3}vw + ${props => props.scale * 25}px);
    height: calc(${props => props.scale * props.hw * 3}vw + ${props => props.scale * props.hw * 25}px);
  }

  @media (max-width: 300px) {
    width: ${props => props.scale * 11}vw;
    height: ${props => props.scale * props.hw * 11}vw;
  }
  
`;

export default ResponsiveImage;
