/**
 * EditWeeklyPage
 * @flow
 */
import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { getWeekly } from '../graphql/queries';
import { Page } from '../components';
import EditWeeklyForm from '../Weekly/EditWeeklyFormModal';

const EditWeeklyPage = (props) => {
  const { match, history } = props;
  const [weekly, setWeekly] = useState(null);

  useEffect(() => {
    fetchWeekly();
  }, []);

  async function fetchWeekly() {
    const inputData = { id: match.params.id };

    const weekly = await API.graphql(graphqlOperation(getWeekly, inputData));

    setWeekly(weekly.data.getWeekly);
  }

  return (
    <Page>
      <AmplifySignOut />
      {weekly && (
        <EditWeeklyForm
          key={match.params.id}
          weekly={weekly}
          onSubmit={() => history.push('/weekly')}
        />
      )}
    </Page>
  );
};

export default withAuthenticator(EditWeeklyPage);
