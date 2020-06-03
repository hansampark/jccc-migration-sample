import React from 'react';
import styled from 'styled-components';
import { formatDate } from '../lib/format';

const WeeklyPostWrapper = styled.article`
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
`;

const Image = styled.img`
  width: 100%;
  object-fit: contain;
`;

const WeeklyPostHeader = styled.header`
  background-color: rgba(255, 255, 255, 0.97);
`;
const WeeklyPostTitle = styled.h1`
  display: inline-block;
  line-height: 2;
  border-left: 5px solid #27ae60;
`;

const WeeklyDetail = (props) => (
  <WeeklyPostWrapper>
    <WeeklyPostHeader>
      <WeeklyPostTitle>{formatDate(props.date, 'YYYY-MM-DD')}</WeeklyPostTitle>
    </WeeklyPostHeader>

    {props.images.map((image, ix) => (
      <Image key={ix} src={image} />
    ))}
  </WeeklyPostWrapper>
);

export default WeeklyDetail;
