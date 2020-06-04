import React, { useState, useEffect } from 'react';
import InfiniteCalendar from 'react-infinite-calendar';
import { Storage, API, graphqlOperation } from 'aws-amplify';
import { v4 as uuidv4 } from 'uuid';
import {
  createWeekly as CreateWeekly,
  deleteWeekly as DeleteWeekly,
} from '../graphql/mutations';
import { listWeeklys as ListWeeklys } from '../graphql/queries';
import WeeklyImageList from '../components/WeeklyImageList';
import { AddFileRow } from '../components/FileControls';
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

const Weekly = (props) => {
  const [date, setDate] = useState('');
  const [files, setFiles] = useState([]);
  const [weeklys, updateWeeklys] = useState([]);
  useEffect(() => {
    listWeeklys();
  }, []);

  // Query the API and save them to the state
  async function listWeeklys() {
    const weeklys = await API.graphql(graphqlOperation(ListWeeklys));
    updateWeeklys(weeklys.data.listWeeklys.items);
  }

  async function createWeekly() {
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
        await API.graphql(graphqlOperation(CreateWeekly, { input: inputData }));
        props.history.push('/');
      } catch (error) {
        console.log('[error]', error);
      }
    }
  }

  async function deleteWeekly(id) {
    const inputData = { id };
    console.log('[inputData]', inputData);
    try {
      await API.graphql(graphqlOperation(DeleteWeekly, { input: inputData }));
      props.history.push('/');
    } catch (error) {
      console.log('[delete error]', error);
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <label style={{ margin: 10 }}>Date</label>
      <InfiniteCalendar
        selected={date}
        disableDays={[1, 2, 3, 4, 5, 6]}
        displayOptions={{
          layout: 'landscape',
        }}
        width={500}
        height={300}
        onSelect={(d) => setDate(d)}
      />

      <WeeklyImageList
        files={files}
        onReorder={({ files, sourceIndex, destinationIndex }) => {
          const reorderedFiles = reorder(files, sourceIndex, destinationIndex);
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

      {weeklys.map((w, i) => (
        <div key={i}>
          <img style={{ width: 400 }} src={w.images[0]} alt="Logo" />

          <button
            style={{
              width: 200,
              backgroundColor: 'red',
              cursor: 'pointer',
              height: 30,
              margin: 10,
            }}
            onClick={() => deleteWeekly(w.id)}
          >
            Delete Weekly
          </button>
        </div>
      ))}

      <button
        style={{
          width: 200,
          backgroundColor: '#ddd',
          cursor: 'pointer',
          height: 30,
          margin: 10,
        }}
        onClick={createWeekly}
      >
        Create Weekly
      </button>
    </div>
  );
};

export default Weekly;
