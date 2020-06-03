/**
 * TileLink
 * @flow
 **/
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { LazyImage } from './Image';

const TileLink = styled(Link)`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: 0 solid transparent;
  background-color: #ffffff;
  text-decoration: none;
  transition: opacity 0.25s ease-in-out;

  flex: 1;
  width: 50vw;
  height: 50vw;
  font-size: 1.2em;

  &:hover {
    opacity: 0.85;
    border: 0 solid transparent;
  }

  @media screen and (min-width: 769px) {
    width: 24.5vw;
    height: 24.5vw;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: block;
  width: 80%;
  height: 80%;
  margin: 5%;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
`;

const StyledLazyImage = styled(LazyImage)`
  width: 100%;
  height: 100%;
`;

const Title = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2rem;
  padding: 0 4%;
  background-color: rgba(255, 255, 255, 0.25);
  color: #ffffff;
  font-family: sans-serif;
  font-size: 1rem;
  line-height: 1.6;
`;

const Subtitle = styled.footer`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2rem;
  background-color: rgba(255, 255, 255, 0.125);
  color: #ffffff;
  text-align: right;
  padding: 0 4%;
  font-family: sans-serif;
  font-size: 0.9rem;
  line-height: 1.6;
`;

const Tile = (props) => (
  <TileLink to={props.href}>
    <Wrapper>
      {props.lazy ? (
        <StyledLazyImage
          src={props.src}
          alt={props.title}
          threshold={props.threshold}
        />
      ) : (
        <Img src={props.src} alt={props.title} />
      )}
      <Title>{props.title}</Title>
      <Subtitle>{props.subtitle}</Subtitle>
    </Wrapper>
  </TileLink>
);

export default Tile;
