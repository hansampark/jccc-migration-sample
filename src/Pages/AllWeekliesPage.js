import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

import { WeeklyListWithData } from '../Weekly';

const ContentWrapper = styled.div`
  padding: 0 0 1rem;

  @media screen and (min-width: 769px) {
    padding: 1rem 1.5rem;
  }
`;

const AllWeekliesPage = (props) => {
  return (
    <ContentWrapper>
      <Helmet>
        <title>{'기쁜우리교회 | 주보'}</title>
      </Helmet>

      <WeeklyListWithData
        header={'주보'}
        location={props.location}
        history={props.history}
      />
    </ContentWrapper>
  );
};

export default AllWeekliesPage;
