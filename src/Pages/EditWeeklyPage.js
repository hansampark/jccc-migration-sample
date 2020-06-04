/**
 * EditWeeklyPage
 * @flow
 */
import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { getWeekly } from '../graphql/queries';
import { Page } from '../components';
import EditWeeklyForm from '../Weekly/EditWeeklyFormModal';

const EditWeeklyPage = (props) => {
  const { match, history } = props;
  const [weekly, setWeekly] = useState();

  useEffect(() => {
    fetchWeekly();
  }, []);

  async function fetchWeekly() {
    const weekly = await API.graphql(graphqlOperation(getWeekly));
    setWeekly(weekly.data);
  }

  return (
    <Page>
      <EditWeeklyForm
        key={match.params.id}
        weekly={weekly}
        onSubmit={() => history.push('/weekly')}
      />
    </Page>
  );
};

export default EditWeeklyPage;
