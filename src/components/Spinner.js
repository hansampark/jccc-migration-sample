import React from 'react';
import styled, { keyframes } from 'styled-components';
import SVG from './SVG';

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;
const dash = keyframes`
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
`;

const StyledSVG = styled(SVG)`
  animation: ${rotate} 2s linear infinite;
  width: ${(props) => props.size || '24px'};
  height: ${(props) => props.size || '24px'};

  & .path {
    stroke: ${(props) => props.stroke || '#ffffff'};
    stroke-linecap: round;
    animation: ${dash} 1.5s ease-in-out infinite;
  }
`;
// hsl(210, 70%, 75%);

const Spinner = (props) => (
  <StyledSVG fill={undefined} stroke={props.color} size={props.size}>
    <circle
      className="path"
      cx="12"
      cy="12"
      r="10"
      fill="none"
      strokeWidth="3"
    />
  </StyledSVG>
);

export default Spinner;
