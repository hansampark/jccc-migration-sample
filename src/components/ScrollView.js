/**
 * ScrollView
 * @flow
 */
import React from 'react';
import styled from 'styled-components';

const Scrollable = styled.div`
  width: ${(props) => props.width || '100%'};
  height: ${(props) => props.height || '100%'};
  overflow: hidden;
`;

export default class ScrollView extends React.Component {
  render() {
    const { children, height, width, onScroll } = this.props;

    return (
      <Scrollable width={width} height={height} onScroll={onScroll}>
        {children}
      </Scrollable>
    );
  }
}
