import React, { useState } from 'react';
import InfiniteCalendar from 'react-infinite-calendar';
import styled from 'styled-components';
import { Storage, API, graphqlOperation } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { v4 as uuidv4 } from 'uuid';
import { createWeekly } from '../graphql/mutations';

import WeeklyImageList from '../Weekly/WeeklyImageList';
import { AddFileRow } from '../components/FileControls';
import { Absolute, Relative, Paper, Button } from '../components';
import config from '../aws-exports';
import 'react-infinite-calendar/styles.css';

const {
  aws_user_files_s3_bucket_region: region,
  aws_user_files_s3_bucket: bucket,
} = config;

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const Wrapper = styled(Paper)`
  margin: 0 auto 1rem;
  width: 100%;
  max-width: 720px;

  @media (min-width: 600px) {
    width: 80vw;
  }
`;

const Form = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  padding: 0 0 5rem;
`;

const FieldSet = styled.fieldset`
  flex: 1;
  border: none;
  padding: 0 1rem;
`;

const FormSection = styled.div`
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

const ErrorMessage = styled.div`
  position: absolute;
  bottom: -1rem;
  color: #f44336;
  padding: 1rem 0;
`;

const validate = ({ date, files }) => {
  let hasError = false;
  const errors = {};

  if (!date) {
    errors.date = 'Date is required.';
    hasError = true;
  }

  if (!files || files.length < 1) {
    errors.files = 'At least one image is required.';
    hasError = true;
  }

  return hasError ? errors : hasError;
};

const NewWeeklyForm = (props) => {
  const [date, setDate] = useState('');
  const [files, setFiles] = useState([]);

  // Query the API and save them to the state

  async function handleSubmit(e) {
    e.preventDefault();
    if (files.length > 0) {
      const metadata = files.map((file, i) => {
        const extension = file.name.split('.')[1];
        const { type: mimeType } = file;
        const key = `images/${uuidv4()}.${extension}`;
        const url = `https://${bucket}.s3-${region}.amazonaws.com/public/${key}`;

        return { extension, mimeType, key, url, file };
      });

      const inputData = { date, images: metadata.map((m) => m.url) };

      try {
        metadata.map(async (m, i) => {
          const { key, file, mimeType } = m;
          await Storage.put(key, file, {
            contentType: mimeType,
          });
        });
        await API.graphql(graphqlOperation(createWeekly, { input: inputData }));
        props.history.push('/');
      } catch (error) {
        console.log('[error]', error);
      }
    }
  }

  return (
    <Wrapper zDepth={1}>
      <Relative style={{ width: '100%', height: '100%' }}>
        <AmplifySignOut />
        <Form onSubmit={handleSubmit}>
          <FieldSet>
            <FormSection>
              <Label>{'Date *'}</Label>
              <Paper zDepth={1}>
                <InfiniteCalendar
                  selected={date}
                  disabledDays={[1, 2, 3, 4, 5, 6]}
                  displayOptions={{
                    layout: window.innerWidth <= 769 ? 'portrait' : 'landscape',
                  }}
                  width={'100%'}
                  height={300}
                  onSelect={(d) => setDate(d)}
                />
              </Paper>
            </FormSection>

            <FormSection>
              <Label>{'Images *'}</Label>

              <WeeklyImageList
                files={files}
                onReorder={({ files, sourceIndex, destinationIndex }) => {
                  const reorderedFiles = reorder(
                    files,
                    sourceIndex,
                    destinationIndex
                  );
                  setFiles(reorderedFiles);
                }}
                onChange={(changedFile, ix) => {
                  const copiedFiles = [...files];
                  copiedFiles[ix] = changedFile;
                  setFiles(copiedFiles);
                }}
                onRemove={(ix) => {
                  const copiedFiles = [...files];
                  copiedFiles.splice(ix, 1);
                  setFiles(copiedFiles);
                }}
              />

              <AddFileRow
                key={files.length}
                onChange={($files) => {
                  // Do not add if file already exists in list

                  const $newFiles = Array.from($files).filter(
                    ($file) => !files.find((f) => f.name === $file.name)
                  );

                  if ($newFiles.length > 0) {
                    setFiles([...files, ...$newFiles]);
                  }
                }}
              />
            </FormSection>
          </FieldSet>

          <Absolute bottom={0} height={'5rem'} width={'100%'}>
            <FormSection
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                height: '5rem',
                backgroundColor: 'rgba(255, 255, 255, 0.75)',
              }}
            >
              <Button type="submit" label={'Create'} primary />
            </FormSection>
          </Absolute>
        </Form>
      </Relative>
    </Wrapper>
  );
};

export default withAuthenticator(NewWeeklyForm);
