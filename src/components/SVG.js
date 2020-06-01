import React from 'react';

const SVG = ({
  fill = '#FFFFFF',
  width,
  height,
  size = 24,
  viewBox = '0 0 24 24',
  children,
  className,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox={viewBox}
    className={className}
    fill={fill}
    width={width || size}
    height={height || size}
  >
    {children}
  </svg>
);

export default SVG;
