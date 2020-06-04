/**
 * EditVideoFormModal
 * @flow
 */
import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { API, graphqlOperation } from 'aws-amplify';
import { updateVideo, deleteVideo } from '../graphql/mutations';
import moment from 'moment';
import InfiniteCalendar from 'react-infinite-calendar';
import { Button, Modal, ConfirmModal } from '../components';
import VideoThumbnail from './VideoThumbnail';

const CATEGORIES = {
  SUNDAY: 'SUNDAY',
  SATURDAY: 'SATURDAY',
  SPECIAL: 'SPECIAL',
};

const Form = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  height: 100%;
`;

const FieldSet = styled.fieldset`
  flex: 1;
  border: none;
`;

const FormControl = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1rem;

  & + & {
    margin-top: 15px;
  }
`;

const Label = styled.label`
  color: #3c3c3c;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  display: inline-block;
  flex: 1;
  border: none;
  border-bottom: 1px solid ${(props) => (props.error ? '#F44336' : '#2196f3')};
  padding: 1rem 0;
  font-size: 1rem;
`;

const ErrorMessage = styled.div`
  position: absolute;
  bottom: -1rem;
  color: #f44336;
  padding: 1rem 0;
`;

const VideoCard = styled.div`
  display: block;
  margin: 0 auto;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  width: 90%;
  height: auto;
`;

const validate = ({ title, date, youtubeId, category }) => {
  const errors = {};

  if (!title) {
    errors.title = 'Title is required.';
  }

  if (!date) {
    errors.date = 'Date is required.';
  }

  if (!youtubeId) {
    errors.youtubeId = 'URL is required.';
  }

  if (!category) {
    errors.category = 'Category is required.';
  }

  return errors;
};

const extractYoutubeVideoID = (url) => {
  const results = url.match('[?&]v=([^&#]*)');
  const vid = results === null ? url : results[1];
  return vid;
};

// const searchYoutubeVideo = async (url, callback) => {
//   const id = extractYoutubeVideoID(url);

//   fetch(
//     `https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${GOOGLE_API_KEY}&part=snippet`,
//     { referrer: 'www.joyfulccc.org' }
//   )
//     .then((res) => res.json())
//     .then((data) => callback(data));
// };

// const debouncedYoutubeSearch = debounce(searchYoutubeVideo, 400);

class VideoForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.video.title || '',
      date: moment(props.video.date).toDate() || null,
      url: '',
      category: props.video.category || 'SUNDAY',
      saving: false,
      deleting: false,
      errors: {},
      showConfirm: false,
    };
  }

  render() {
    const { video, onCancel } = this.props;
    const {
      title,
      date,
      url,
      category,
      saving,
      deleting,
      errors,
      showConfirm,
    } = this.state;
    const vid = url ? extractYoutubeVideoID(url) : video.youtubeId;

    return (
      <Modal
        fullscreen
        onClose={onCancel}
        actions={[
          <Button
            key="delete"
            width={'150px'}
            label="Delete"
            danger
            onClick={this.handleTryDelete}
            disabled={deleting}
            loading={deleting}
            style={{ marginRight: '1rem' }}
          />,
          <Button
            key="save"
            label="Save"
            primary
            onClick={this.handleSave}
            width={'150px'}
            disabled={saving}
            loading={saving}
          />,
        ]}
      >
        <Form>
          <FieldSet>
            <FormControl>
              <Label>{'Category *'}</Label>
              <select
                onChange={this.handleCategoryChange}
                value={category}
                error={errors.category}
              >
                {Object.keys(CATEGORIES).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && (
                <ErrorMessage>{errors.category}</ErrorMessage>
              )}
            </FormControl>

            <FormControl>
              <Label>{'URL *'}</Label>
              <Input
                type="text"
                onChange={this.handleURLChange}
                value={url}
                error={errors.url}
              />
              {errors.url && <ErrorMessage>{errors.url}</ErrorMessage>}
            </FormControl>

            <FormControl>
              <Label>{'Title *'}</Label>
              <Input
                type="text"
                onChange={this.handleTitleChange}
                value={title}
                error={errors.title}
              />
              {errors.title && <ErrorMessage>{errors.title}</ErrorMessage>}
            </FormControl>

            <FormControl>
              <Label>{'Date *'}</Label>
              <InfiniteCalendar
                selected={date}
                displayOptions={{
                  layout: window.innerWidth <= 769 ? 'portrait' : 'landscape',
                }}
                width={'100%'}
                height={200}
                onSelect={this.handleDateChange}
              />
              {errors.date && <ErrorMessage>{errors.date}</ErrorMessage>}
            </FormControl>

            {vid && (
              <VideoCard>
                <VideoThumbnail youtubeId={vid} title={title} />
              </VideoCard>
            )}
          </FieldSet>
        </Form>

        {showConfirm && (
          <ConfirmModal
            title={'Confirm'}
            buttonLabel={'Delete'}
            message={'Are you sure to delete this video?'}
            onSubmit={this.handleDelete}
            onCancel={() => this.setState({ showConfirm: false })}
          />
        )}
      </Modal>
    );
  }

  processYoutubeData = (data) => {
    try {
      const { items } = data;
      const video = items[0];

      if (video) {
        this.setState((state) => ({
          title: video.snippet.localized.title,
        }));
      } else {
        this.setState({
          errors: { url: 'Nothing found.' },
        });
      }
    } catch (error) {
      console.log(error);
      this.setState({
        errors: { url: 'Nothing found.' },
      });
    }
  };

  handleURLChange = (e) => {
    this.setState({
      url: e.target.value,
    });

    // debouncedYoutubeSearch(e.target.value, this.processYoutubeData);
  };

  handleTitleChange = (e) => {
    this.setState({
      title: e.target.value,
    });
  };

  handleCategoryChange = (e) => {
    this.setState({
      category: e.target.value,
    });
  };

  handleDateChange = (date) => {
    this.setState({
      date,
    });
  };

  handleSave = async (e) => {
    e.preventDefault();

    const { video, onSave } = this.props;
    const { title, date, category, url } = this.state;

    const errors = validate({
      ...this.state,
      youtubeId: url ? extractYoutubeVideoID(url) : video.youtubeId,
    });

    this.setState({
      errors,
    });

    if (!errors.url && !errors.title && !errors.category) {
      this.setState({
        saving: true,
      });

      const inputData = {
        id: video.id,
        title,
        date,
        youtubeId: url ? extractYoutubeVideoID(url) : video.youtubeId,
        category,
      };

      await API.graphql(graphqlOperation(updateVideo, { input: inputData }));

      this.setState({
        saving: false,
      });
      // console.log('[update]', resp);

      onSave();
    }
  };

  handleTryDelete = () => {
    this.setState({
      showConfirm: true,
    });
  };

  handleDelete = async (e) => {
    e.preventDefault();

    const { video, onDelete } = this.props;

    this.setState({
      deleting: true,
    });

    const inputData = { id: video.id };

    await API.graphql(graphqlOperation(deleteVideo, { input: inputData }));

    this.setState({
      deleting: false,
    });
    // console.log('[delete]', resp);

    onDelete();
  };
}

export default withRouter(VideoForm);
