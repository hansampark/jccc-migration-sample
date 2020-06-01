/**
 * Position
 *   Absolute, Relative, Fixed
 * @flow
 */
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const cssVal = (value) => {
  if (typeof value === 'number') {
    if (value === 0) {
      return '0';
    }
    return `${value}px`;
  }

  return value;
};

export const Fixed = styled.div`
  position: fixed;
  top: ${(props) => cssVal(props.top) || 'auto'};
  bottom: ${(props) => cssVal(props.bottom) || 'auto'};
  left: ${(props) => cssVal(props.left) || 'auto'};
  right: ${(props) => cssVal(props.right) || 'auto'};
  width: ${(props) => cssVal(props.width) || 'auto'};
  height: ${(props) => cssVal(props.height) || 'auto'};
  z-index: ${(props) => props.zIndex || 0};
`;

export const FixedPortal = ({ children, id, ...position }) => {
  const $el = document.createElement('div');
  $el.setAttribute('id', id);
  document.body.appendChild($el);
  return ReactDOM.createPortal(<Fixed {...position}>{children}</Fixed>, $el);
};

export const Sticky = styled.div`
  position: sticky;
  top: ${(props) => cssVal(props.top) || 'auto'};
  bottom: ${(props) => cssVal(props.bottom) || 'auto'};
  left: ${(props) => cssVal(props.left) || 'auto'};
  right: ${(props) => cssVal(props.right) || 'auto'};
  width: ${(props) => cssVal(props.width) || 'auto'};
  height: ${(props) => cssVal(props.height) || 'auto'};
  z-index: ${(props) => props.zIndex || 0};
`;

export const Absolute = styled.div`
  position: absolute;
  top: ${(props) => cssVal(props.top) || 'auto'};
  bottom: ${(props) => cssVal(props.bottom) || 'auto'};
  left: ${(props) => cssVal(props.left) || 'auto'};
  right: ${(props) => cssVal(props.right) || 'auto'};
  width: ${(props) => cssVal(props.width) || 'auto'};
  height: ${(props) => cssVal(props.height) || 'auto'};
  z-index: ${(props) => props.zIndex || 0};
`;

export const AbsoluteFill = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: ${(props) => props.zIndex || 0};
`;

export const Relative = styled.div`
  position: relative;
  top: ${(props) => cssVal(props.top) || 'auto'};
  bottom: ${(props) => cssVal(props.bottom) || 'auto'};
  left: ${(props) => cssVal(props.left) || 'auto'};
  right: ${(props) => cssVal(props.right) || 'auto'};
  width: ${(props) => cssVal(props.width) || 'auto'};
  height: ${(props) => cssVal(props.height) || 'auto'};
  z-index: ${(props) => props.zIndex || 0};
`;
