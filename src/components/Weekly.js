import React, { useState, useEffect } from 'react';
import InfiniteCalendar from 'react-infinite-calendar';
import { Storage, API, graphqlOperation } from 'aws-amplify';
import { v4 as uuidv4 } from 'uuid';
import {
  createWeekly as CreateWeekly,
  deleteWeekly as DeleteWeekly,
} from '../graphql/mutations';
import { listWeeklys as ListWeeklys } from '../graphql/queries';
import config from '../aws-exports';
import 'react-infinite-calendar/styles.css';

const {
  aws_user_files_s3_bucket_region: region,
  aws_user_files_s3_bucket: bucket,
} = config;

const Weekly = () => {
  const [date, setDate] = useState('');
  const [file, updateFile] = useState(null);
  const [weeklys, updateWeeklys] = useState([]);
  const [id, setId] = useState('');
  useEffect(() => {
    listWeeklys();
  }, []);

  console.log('[weeklys]', weeklys);

  // Query the API and save them to the state
  async function listWeeklys() {
    const weeklys = await API.graphql(graphqlOperation(ListWeeklys));
    updateWeeklys(weeklys.data.listWeeklys.items);
  }

  function handleChange(event) {
    const {
      target: { value, files },
    } = event;

    const fileForUpload = files[0];

    updateFile(fileForUpload || value);
  }

  async function createWeekly() {
    if (file) {
      const extension = file.name.split('.')[1];
      const { type: mimeType } = file;
      const key = `images/${uuidv4()}.${extension}`;
      const url = `https://${bucket}.s3-${region}.amazonaws.com/public/${key}`;
      const inputData = { date, images: [url] };

      try {
        await Storage.put(key, file, {
          contentType: mimeType,
        });
        console.log('[bucket]', bucket, '[region]', region, '[key]', key);
        console.log('[inputData]', inputData);
        await API.graphql(graphqlOperation(CreateWeekly, { input: inputData }));
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

      <input type="file" onChange={handleChange} style={{ margin: 10 }} />

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

// ('https://ampreact578c9eb893db42f68898b5f23803af19152341-dev.s3us-west-2.amazonaws.com/public/images/0c6b5e36-a240-4f2f-a5b2-fd40bd17dbdd.jpg');

// ('https://ampreact578c9eb893db42f68898b5f23803af19152341-dev.s3-us-west-2.amazonaws.com/public/images/0c6b5e36-a240-4f2f-a5b2-fd40bd17dbdd.jpg');
