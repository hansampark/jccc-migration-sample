import React from 'react';
import styled from 'styled-components';
import Poster from './Poster';

const Wrapper = styled.div`
  position: relative;
  width: ${(props) => props.width || 'auto'};
  height: ${(props) => props.height || 'auto'};
`;

const Mask = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 20%;
  background-color: rgba(0, 0, 0, 0.25);
  color: #ffffff;
  box-sizing: border-box;

  display: flex;
  flex-wrap: no-wrap;
  align-items: center;
  padding: 1rem;
`;

const Title = styled.div`
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default class VideoThumbnail extends React.Component {
  render() {
    const { title, youtubeId, width, height, onClick } = this.props;

    return (
      <Wrapper onClick={onClick} width={width} height={height}>
        <Poster youtubeId={youtubeId} title={title} />
        {title && (
          <Mask>
            <Title>{title}</Title>
          </Mask>
        )}
      </Wrapper>
    );
  }
}
