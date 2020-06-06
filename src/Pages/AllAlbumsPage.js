import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

import { AlbumListWithData } from '../Album';

const ContentWrapper = styled.div`
  padding: 0 0 1rem;

  @media screen and (min-width: 769px) {
    padding: 1rem 1.5rem;
  }
`;

const AllBulletinPage = (props) => {
  return (
    <ContentWrapper>
      <Helmet>
        <title>{'기쁜우리교회 | 행사앨범'}</title>
      </Helmet>

      <AlbumListWithData
        header={'행사앨범'}
        location={props.location}
        history={props.history}
      />
    </ContentWrapper>
  );
};

export default AllBulletinPage;
