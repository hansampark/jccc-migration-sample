/**
 * EditWeeklyFormModal
 * @flow
 */
import { isEqual } from 'lodash';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Storage, API, graphqlOperation } from 'aws-amplify';
import { updateWeekly, deleteWeekly } from '../graphql/mutations';
import styled from 'styled-components';
import InfiniteCalendar from 'react-infinite-calendar';
import moment from 'moment';
import { Absolute, Relative, Paper, Button, ConfirmModal } from '../components';
import WeeklyImageList from './WeeklyImageList';
import {
  AddFileRow,
  EditIndicator,
  EditType,
} from '../components/FileControls';

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

  return hasError ? errors : hasError;
};

const EditWeeklyFormModal = (props) => {
  const { weekly, onSubmit } = props;
  const [date, setDate] = useState(moment(weekly.date).toDate());
  const [files, setFiles] = useState(weekly.images.map((url) => ({ url })));
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [errors, setErrors] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  console.log('[props]', props);

  const handleSave = async (e) => {
    e.preventDefault();

    const errors = validate({ date });

    setErrors(errors);

    if (!errors.date) {
      setSaving(true);

      const metadata = files.map((file, i) => {
        const extension = file.name.split('.')[1];
        const { type: mimeType } = file;
        const key = `images/${uuidv4()}.${extension}`;
        const url = `https://${bucket}.s3-${region}.amazonaws.com/public/${key}`;

        return { extension, mimeType, key, url, file };
      });

      const inputData = {
        id: weekly.id,
        date,
        images: metadata.map((m) => m.url),
      };

      try {
        metadata.map(async (m, i) => {
          const { key, file, mimeType } = m;
          await Storage.put(key, file, {
            contentType: mimeType,
          });
        });
        await API.graphql(graphqlOperation(updateWeekly, { input: inputData }));

        setSaving(false);

        onSubmit();
      } catch (err) {
        console.log('[err]', err);
      }
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    setDeleting(true);

    const inputData = {
      id: weekly.id,
    };

    await API.graphql(graphqlOperation(deleteWeekly, { input: inputData }));

    setDeleting(false);

    onSubmit();
  };

  return (
    <Wrapper zDepth={1}>
      <Relative style={{ width: '100%', height: '100%' }}>
        <Form>
          <FieldSet>
            <FormSection>
              {new Date(weekly.date).getTime() !== date.getTime() && (
                <EditIndicator editType={EditType.EDITED} />
              )}
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
              {errors.date && <ErrorMessage>{errors.date}</ErrorMessage>}
            </FormSection>

            <FormSection>
              <Label>{'Images *'}</Label>
              {!isEqual(
                weekly.images.map((url) => ({ url })),
                files
              ) && <EditIndicator editType={EditType.EDITED} />}

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

              {errors.files && <ErrorMessage>{errors.files}</ErrorMessage>}
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
              <Button
                key="delete"
                width={'120px'}
                label="Delete"
                danger
                onClick={() => setShowConfirm(true)}
                disabled={deleting}
                loading={deleting}
                style={{ marginRight: '1rem' }}
              />

              <Button
                key="save"
                label="Save"
                primary
                onClick={handleSave}
                width={'120px'}
                disabled={saving}
                loading={saving}
              />
            </FormSection>
          </Absolute>
        </Form>

        {showConfirm && (
          <ConfirmModal
            title={'Confirm'}
            buttonLabel={'Delete'}
            message={'Are you sure to delete this video?'}
            onSubmit={handleDelete}
            onCancel={() => setShowConfirm(false)}
          />
        )}
      </Relative>
    </Wrapper>
  );
};

export default withRouter(EditWeeklyFormModal);
