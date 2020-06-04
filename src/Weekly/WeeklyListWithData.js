import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { API, graphqlOperation } from 'aws-amplify';
import { listWeeklys as ListWeeklys } from '../graphql/queries';
import Detail from './Detail';
import List from './List';

const Wrapper = styled.div``;

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const WeeklyListWithData = (props) => {
  const [allWeeklys, setWeeklys] = useState([]);
  const [weekly, setWeekly] = useState({});

  useEffect(() => {
    listWeeklys();
  }, []);

  async function listWeeklys() {
    const weeklys = await API.graphql(graphqlOperation(ListWeeklys));
    setWeeklys(weeklys.data.listWeeklys.items);
  }

  function handleWeeklyClick(weekly) {
    setWeeklys(weekly);

    props.history.push(`/weekly/${weekly.id}`);
  }

  return (
    <Wrapper>
      <Container>
        {allWeeklys.length > 0 && (
          <List
            header={'Weekly'}
            weeklies={allWeeklys}
            onWeeklyClick={handleWeeklyClick}
            moreLink={'/weekly'}
          />
        )}
      </Container>
    </Wrapper>
  );
};

export default WeeklyListWithData;
