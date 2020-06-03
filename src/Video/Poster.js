import React from 'react';
import styled from 'styled-components';
import { LazyImage } from '../components/Image';

const Img = styled(LazyImage)`
  display: block;
  width: 48vw;
  height: 36vw;
  max-width: 360px;
  max-height: 270px;
  min-width: 155px;
  min-height: 115px;

  @media screen and (min-width: 769px) {
    width: 12vw;
    height: 9vw;
  }
`;

export default class Poster extends React.Component {
  render() {
    const { title, youtubeId } = this.props;
    const src = `https://img.youtube.com/vi/${youtubeId}/0.jpg`;

    return <Img src={src} alt={title} />;
  }
}
