/**
 * EditAlbumPage
 * @flow
 */
import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { getAlbum } from '../graphql/queries';
import { Page } from '../components';
import EditAlbumForm from '../Album/EditAlbumFormModal';

const EditAlbumPage = (props) => {
  const { match, history } = props;
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    fetchAlbum();
  }, []);

  async function fetchAlbum() {
    const inputData = { id: match.params.id };

    const album = await API.graphql(graphqlOperation(getAlbum, inputData));

    setAlbum(album.data.getAlbum);
  }

  return (
    <Page>
      {album && (
        <EditAlbumForm
          key={match.params.id}
          album={album}
          onSubmit={() => history.push('/album')}
        />
      )}
    </Page>
  );
};

export default EditAlbumPage;
