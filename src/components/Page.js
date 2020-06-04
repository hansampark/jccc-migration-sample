/**
 * Page
 * @flow
 */
import React from 'react';
import styled from 'styled-components';
import ErrorBoundary from './ErrorBoundary';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  flex: 1;
  padding: 0;

  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  display: flex;
  padding: 0 1rem;
  align-items: center;
  z-index: 1;
`;

const Content = styled.section`
  padding: 0;
  flex: 1;

  display: flex;
  flex-direction: column;
`;

const Heading = styled.h1`
  flex: 1;
`;

const Page = (props) => (
  <Wrapper onScroll={props.onScroll}>
    {(props.title || props.action) && (
      <Header>
        <Heading>{props.title}</Heading>
        {props.action}
      </Header>
    )}

    <Content>
      <ErrorBoundary>{props.children}</ErrorBoundary>
    </Content>
  </Wrapper>
);

export default Page;
