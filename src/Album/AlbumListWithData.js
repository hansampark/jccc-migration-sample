import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { API, graphqlOperation } from 'aws-amplify';
import { listAlbums } from '../graphql/queries';
import Detail from './Detail';
import List from './List';
import EditAlbumFormModal from './EditAlbumFormModal';

const Wrapper = styled.div``;

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const AlbumListWithData = (props) => {
  const [allAlbums, setAlbums] = useState([]);
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    fetchAlbums();
  }, []);

  async function fetchAlbums() {
    const Albums = await API.graphql(graphqlOperation(listAlbums));
    setAlbums(Albums.data.listAlbums.items);
  }

  function handleAlbumClick(album) {
    setAlbum(album);
    console.log('[clicked]');
    props.history.push(`/album/${album.id}`);
  }

  function handleDelete() {
    setAlbum(null);
  }

  function handleSave() {
    setAlbum(null);
  }

  function handleCancel() {
    setAlbum(null);
  }

  return (
    <Wrapper>
      <Container>
        {allAlbums.length > 0 && (
          <List
            header={'Album'}
            albums={allAlbums}
            onAlbumClick={handleAlbumClick}
            moreLink={props.moreLink}
          />
        )}
      </Container>

      {album && (
        <EditAlbumFormModal
          album={album}
          onCancel={handleCancel}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}
    </Wrapper>
  );
};

export default AlbumListWithData;
