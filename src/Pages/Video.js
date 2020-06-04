import React from 'react';

import styled from 'styled-components';
import { API, graphqlOperation } from 'aws-amplify';
import InfiniteCalendar from 'react-infinite-calendar';
import {
  createVideo as CreateVideo,
  deleteVideo as DeleteVideo,
} from '../graphql/mutations';
import { Button } from '../components';
import VideoThumbnail from '../Video/VideoThumbnail';

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
  width: 700px;
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

const ButtonContainer = styled.div`
  text-align: center;
  padding: 1rem;
`;

const Video = styled.div`
  display: block;
  margin: 0 auto;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  width: 90%;
  height: auto;
`;

const validate = ({ title, date, url, category }) => {
  let hasError = false;
  const errors = {};

  if (!title) {
    errors.title = 'Title is required.';
    hasError = true;
  }

  if (!date) {
    errors.date = 'Date is required.';
    hasError = true;
  }

  if (!url) {
    errors.url = 'URL is required.';
    hasError = true;
  }

  if (!category) {
    errors.category = 'Category is required.';
    hasError = true;
  }

  return hasError ? errors : hasError;
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
//     .then(res => res.json())
//     .then(data => callback(data));
// };

// const debouncedYoutubeSearch = debounce(searchYoutubeVideo, 400);

class VideoForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      date: new Date(),
      url: '',
      category: 'SUNDAY',
      loading: false,
      errors: {},
    };
  }

  render() {
    const { title, date, url, category, loading, errors } = this.state;
    const vid = url && extractYoutubeVideoID(url);

    return (
      <Form onSubmit={this.handleSubmit}>
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
            {errors.category && <ErrorMessage>{errors.category}</ErrorMessage>}
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
              height={300}
              onSelect={this.handleDateChange}
            />
            {errors.date && <ErrorMessage>{errors.date}</ErrorMessage>}
          </FormControl>

          {vid && (
            <Video>
              <VideoThumbnail youtubeId={vid} title={title} />
            </Video>
          )}
        </FieldSet>

        <ButtonContainer>
          <Button
            type="submit"
            label={'Submit'}
            primary
            disabled={loading}
            loading={loading}
          />
        </ButtonContainer>
      </Form>
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
        // console.log(video);
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

  handleSubmit = async (e) => {
    e.preventDefault();

    const { onSubmit } = this.props;
    const { title, date, category, url } = this.state;

    const errors = validate(this.state);

    if (errors) {
      this.setState({
        errors,
      });
    } else {
      this.setState({
        loading: true,
      });

      try {
        const inputData = {
          title,
          date,
          category,
          youtubeId: extractYoutubeVideoID(url),
        };
        await API.graphql(graphqlOperation(CreateVideo, { input: inputData }));

        this.setState({
          loading: false,
        });
        this.props.history.push('/');
        // onSubmit();
      } catch (error) {
        console.log('[error]', error);
      }
    }
  };
}

export default VideoForm;
