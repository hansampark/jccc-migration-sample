import React from 'react';
import styled from 'styled-components';

import { Thumbnail as ThumbnailIcon, List } from '../components/Icons';
import Thumbnail from './Thumbnail';

const Wrapper = styled.div`
  width: 100%;
`;

const Loading = styled.div`
  display: flex;
  align-items: center;
  padding: 2rem;
`;

const SectionHeader = styled.header`
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.97);
`;

const SectionTitle = styled.h2`
  display: inline-block;
  font-weight: 200;
  border-bottom: 5px solid #ff0600;
  line-height: 2;
  margin: 0;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: space-between;

  @media screen and (min-width: 769px) {
    justify-content: flex-start;
  }
`;

const Card = styled.div`
  z-index: 5;
  margin-top: 1rem;
  display: ${(props) => (props.hideOnMobile ? 'none' : 'inline-flex')};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  width: 48vw;
  height: 52vw;
  max-width: 360px;
  max-height: 420px;
  min-width: 155px;
  min-height: 175px;
  margin-right: 0;
  cursor: pointer;

  &:last-child {
    margin-right: 0;
  }

  @media screen and (min-width: 769px) {
    display: inline-flex;
    width: 22.5vw;
    height: 24vw;

    margin-right: 10px;
  }
`;

const MoreLink = styled.a`
  display: flex;
  width: 100%;
  height: 100%;
  border: 2px solid #7800ff;
  color: #7800ff;
  text-decoration: none;
  font-weight: 400;
  font-size: 2rem;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  opacity: 1;
  transition: all 0.25s ease-in-out;

  &:hover {
    opacity: 0.85;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-left: 10px;
`;

const ToggleBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;

  svg {
    fill: #ffffff;
  }

  &:hover {
    opacity: 0.5;

    background-color: #ffffff;
    color: ${(props) => (props.isActive ? '#ffffff' : 'black')};

    svg {
      fill: transparent;
    }
  }
`;

const Label = styled.div`
  color: ${(props) => (props.isActive ? '#2196f3' : '#1D1D1D')};
`;

const ToggleBtn = styled.button`
  display: inline-block;
  vertical-align: middle;
  height: 26px;
  padding: 0;
  border-radius: 4px;
  box-shadow: none;
  outline: none;
  margin-right: 3px;
  width: 26px;
  color: #ffffff;
  border: ${(props) =>
    props.isActive ? '1px solid #2196f3' : `1px solid #1D1D1D`};
  background-color: ${(props) => (props.isActive ? '#ffffff' : 'transparent')};

  svg {
    fill: #ffffff;
  }

  &:hover {
    opacity: 0.5;
    border: ${(props) =>
      props.isActive ? '1px solid #2196f3' : '1px solid #1d1d1d'};
    background-color: #ffffff;
    color: ${(props) => (props.isActive ? '#ffffff' : 'black')};

    svg {
      fill: transparent;
    }
  }
`;

export default class AlbumList extends React.Component {
  render() {
    const {
      header,
      albums,
      moreLink,

      onAlbumClick,
    } = this.props;

    return (
      <Wrapper>
        {header && (
          <SectionHeader>
            <SectionTitle>{header}</SectionTitle>
          </SectionHeader>
        )}

        <CardWrapper>
          {albums.map((album) => (
            <Card key={album.id} onClick={() => onAlbumClick(album)}>
              <Thumbnail {...album} />
            </Card>
          ))}
          {moreLink && (
            <Card>
              <MoreLink href={moreLink}>{'More..'}</MoreLink>
            </Card>
          )}
        </CardWrapper>
      </Wrapper>
    );
  }
}
