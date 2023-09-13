// noinspection JSUnresolvedVariable

import styled from 'styled-components';

export const Horizontal = styled(
    ({
      pad,
      padH,
      padV,
      center,
      baseline,
      start,
      around,
      left,
      right,
      centerH,
      gap,
      ...rest
    }) =>
        <div {...rest} />)`
  display: flex;
  padding-right: ${props => props.pad || props.padH ? '5%' : 0};
  padding-left: ${props => props.pad || props.padH ? '5%' : 0};
  padding-top: ${props => props.pad || props.padV ? '5%' : 0};
  padding-bottom: ${props => props.pad || props.padV ? '5%' : 0};
  align-items: ${props =>
          props.center ? 'center' :
                  props.baseline ? 'baseline' :
                          props.start ? 'flex-start' :
                                  props.stretch ? 'stretch' :
                                  'flex-end'
  };
  justify-content: ${props =>
          props.around ? 'space-around' :
                  props.left ? 'flex-start' :
                          props.right ? 'flex-end' :
                                  props.centerH ? 'center' :
                                          props.even ? 'space-evenly' :
                                                  'space-between'
  };
  gap: ${props => (props.gap || 0) + 'px'};
`;
export const Vertical = styled(
    ({pad, padH, padV, center, left, right, gap, ...rest}) =>
        <div {...rest} />)`
  display: flex;
  flex-direction: column;
  padding-right: ${props => props.pad || props.padH ? '5%' : 0};
  padding-left: ${props => props.pad || props.padH ? '5%' : 0};
  padding-top: ${props => props.pad || props.padV ? '5%' : 0};
  padding-bottom: ${props => props.pad || props.padV ? '5%' : 0};
  align-items: ${props =>
          props.left ? 'flex-start' :
                  props.right ? 'flex-end' :
                          props.center ? 'center' :
                                  'stretch'
  };
  gap: ${props => (props.gap || 0) + 'px'};
`;
