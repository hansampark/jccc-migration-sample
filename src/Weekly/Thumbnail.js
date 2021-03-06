import React from 'react';
import styled from 'styled-components';
import { formatDate } from '../lib/format';
import { LazyImage } from '../components/Image';

const WeeklyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Media = styled.div`
  overflow: hidden;
`;

const WeeklyImage = styled(LazyImage)`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const WeeklyTitle = styled.h3`
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
  font-size: 1rem;
  margin: 0;
`;

const WeeklyThumbnail = (props) => (
  <WeeklyWrapper onClick={props.onClick}>
    <Media>
      <WeeklyImage
        src={props.images[0]}
        alt={`주보 ${props.date}`}
        threshold={0}
      />
    </Media>

    <WeeklyTitle>{formatDate(props.date, 'YYYY-MM-DD')}</WeeklyTitle>
  </WeeklyWrapper>
);

export default WeeklyThumbnail;
