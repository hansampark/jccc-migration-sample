import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { API, graphqlOperation } from 'aws-amplify';
import { listVideos } from '../graphql/queries';
import groupBy from 'lodash/groupBy';
import VideoList from './VideoList';
import EditVideoFormModal from './EditVideoFormModal';

const Wrapper = styled.div``;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const VideoListWithData = (props) => {
  const { moreLink, category } = props;
  const [allVideos, setVideos] = useState([]);
  const [video, setVideo] = useState(null);
  useEffect(() => {
    fetchVideos();
  }, []);

  const filter = {
    category: {
      contains: category,
    },
  };

  async function fetchVideos() {
    const videos = await API.graphql(
      graphqlOperation(listVideos, { filter: filter })
    );
    setVideos(videos.data.listVideos.items);
  }

  function handleVideoClick(video) {
    setVideo(video);
  }

  function handleDelete() {
    setVideo(null);
  }

  function handleSave() {
    setVideo(null);
  }

  function handleCancel() {
    setVideo(null);
  }

  const videosByCategory = groupBy(allVideos, 'category');

  return (
    <Wrapper>
      <Container>
        {Object.keys(videosByCategory).map((category) => (
          <VideoList
            key={category}
            header={category}
            // loading={data.loading}
            videos={videosByCategory[category]}
            onVideoClick={handleVideoClick}
            moreLink={moreLink}
          />
        ))}
      </Container>

      {video && (
        <EditVideoFormModal
          video={video}
          onCancel={handleCancel}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}
    </Wrapper>
  );
};

export default VideoListWithData;
