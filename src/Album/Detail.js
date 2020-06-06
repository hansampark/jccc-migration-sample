import React from 'react';
import styled from 'styled-components';
import { formatDate } from '../lib/format';

const BulletinPostWrapper = styled.article`
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
`;

const Image = styled.img`
  width: 100%;
  object-fit: contain;
`;

const BulletinPostHeader = styled.header`
  background-color: rgba(255, 255, 255, 0.97);
`;
const BulletinPostTitle = styled.h1`
  display: inline-block;
  line-height: 2;
  border-left: 5px solid #27ae60;
`;

const BulletinDetail = (props) => (
  <BulletinPostWrapper>
    <BulletinPostHeader>
      <BulletinPostTitle>
        {formatDate(props.date, 'YYYY-MM-DD')}
      </BulletinPostTitle>
    </BulletinPostHeader>

    {props.images.map((image, ix) => (
      <Image key={ix} src={image} />
    ))}
  </BulletinPostWrapper>
);

export default BulletinDetail;
