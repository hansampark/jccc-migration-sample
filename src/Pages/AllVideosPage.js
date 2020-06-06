import React, { useState } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

import { VideoListWithData } from '../Video';

const ContentWrapper = styled.div`
  padding: 0 0 1rem;

  @media screen and (min-width: 769px) {
    padding: 1rem 1.5rem;
  }
`;

const SaturdayPage = (props) => {
  const CATEGORY = props.match.url.replace('/videos/', '').toUpperCase();

  const HEADER = {
    SUNDAY: '주일말씀',
    SATURDAY: '토요말씀',
    SPECIAL: '특별말씀',
  };
  return (
    <ContentWrapper>
      <Helmet>
        <title>{`기쁜우리교회 | ${HEADER[CATEGORY]}`}</title>
      </Helmet>

      <VideoListWithData
        category={CATEGORY}
        header={HEADER[CATEGORY]}
        location={props.location}
      />
    </ContentWrapper>
  );
};

export default SaturdayPage;
