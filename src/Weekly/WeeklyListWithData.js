import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { API, graphqlOperation } from 'aws-amplify';
import { listWeeklys as ListWeeklys } from '../graphql/queries';
import Detail from './Detail';
import List from './List';
import EditWeeklyFormModal from './EditWeeklyFormModal';

const Wrapper = styled.div``;

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const WeeklyListWithData = (props) => {
  const [allWeeklys, setWeeklys] = useState([]);
  const [weekly, setWeekly] = useState(null);

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

  function handleDelete() {
    setWeekly(null);
  }

  function handleSave() {
    setWeekly(null);
  }

  function handleCancel() {
    setWeekly(null);
  }

  return (
    <Wrapper>
      <Container>
        {allWeeklys.length > 0 && (
          <List
            header={'Weekly'}
            weeklies={allWeeklys}
            onWeeklyClick={handleWeeklyClick}
            moreLink={props.moreLink}
          />
        )}
      </Container>

      {weekly && (
        <EditWeeklyFormModal
          weekly={weekly}
          onCancel={handleCancel}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}
    </Wrapper>
  );
};

export default WeeklyListWithData;
