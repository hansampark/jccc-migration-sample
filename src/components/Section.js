import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
  position: relative;
  overflow: hidden;
  max-width: ${(props) => props.maxWidth || 'none'};
  margin: 0 auto;
  background-color: ${(props) => props.backgroundColor || 'transparent'};
`;

const Header = styled.header`
  width: 100%;
  text-align: center;
  border-bottom: 1px solid #cecece;
  background-color: rgba(255, 255, 255, 0.97);
  border-top: 1px solid #cecece;
`;

const PageTitle = styled.h1`
  display: inline-block;
  padding: 1rem;
  font-weight: 400;
  font-size: 1.2rem;
  line-height: 2;
  border-bottom: 5px solid #ff0600;
  text-transform: uppercase;
  margin: 0;
  background-color: rgba(255, 255, 255, 0.97);
`;

const Title = styled.h2`
  display: inline-block;
  font-size: 1rem;
  font-weight: 400;
  line-height: 2;
  text-align: center;
  text-transform: uppercase;
  border-bottom: 5px solid #ff0600;
  margin: 0;
  background-color: rgba(255, 255, 255, 0.97);
`;

const Section = ({
  id,
  title,
  children,
  useH1,
  maxWidth,
  backgroundColor,
  className,
  style,
}) => {
  const TitleComponent = useH1 ? PageTitle : Title;

  return (
    <Wrapper
      id={id}
      maxWidth={maxWidth}
      backgroundColor={backgroundColor}
      className={className}
      style={style}
    >
      {title && (
        <Header>
          <TitleComponent>{title}</TitleComponent>
        </Header>
      )}

      {children}
    </Wrapper>
  );
};

export default Section;
