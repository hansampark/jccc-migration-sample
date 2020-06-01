/**
 * FileRow
 * @flow
 */
import React, { useRef } from 'react';
import styled from 'styled-components';
// import moment from 'moment';
import { useDropzone } from 'react-dropzone';
import { useMedia } from '../lib/hooks';
import { FileImage, Img } from './Image';
import { Absolute } from './Position';
import { Remove, Add } from './Icons';
import { ActionButton } from './Buttons';

const Input = styled.input`
  visibility: hidden;
  position: absolute;
  top: 0;
  left: -5000px;
`;

const File = React.forwardRef((props, ref) => (
  <Input {...props} type="file" name="file" ref={ref} />
));

export const EditType = {
  NEW: 'NEW',
  EDITED: 'EDITED',
  DELETED: 'DELETED',
};

export const EditIndicator = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  border-color: transparent;
  border-style: solid;
  border-width: 0.5rem;
  border-right-color: ${(props) =>
    props.editType === EditType.NEW ? '#0c0' : '#B71C1C'};
  border-top-color: ${(props) =>
    props.editType === EditType.NEW ? '#0c0' : '#B71C1C'};
`;

const FileRowWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: stretch;
`;

const Order = styled.h4`
  width: 30px;
  text-align: center;
`;

const Thumbnail = styled.div`
  width: 8rem;
  height: 8rem;

  &:hover {
    opacity: 0.75;
  }
`;

const ThumbImg = styled(Img)`
  width: 8rem;
  height: 8rem;
  object-fit: contain;
`;

const ThumbFileImg = styled(FileImage)`
  width: 8rem;
  height: 8rem;
  object-fit: contain;
`;

const FileMeta = styled.div`
  flex: 1;
  max-width: 16rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;

  min-width: 0;
`;

const FileMetaValue = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  & + & {
    margin-top: 0.25rem;
  }
`;

const FIVE_HUDNRED_KB_IN_BYTE = 1024 * 500;

const FileSize = (props) => {
  const { file } = props;
  if (!file.size) {
    return null;
  }

  let unit = 'KB';
  let val = file.size / 1024;

  if (file.size > FIVE_HUDNRED_KB_IN_BYTE) {
    unit = 'MB';
    val = val / 1024;
  }

  return (
    <FileMetaValue>
      {val.toFixed(1)} {unit}
    </FileMetaValue>
  );
};

export const FileRow = (props) => {
  const fileInputRef = useRef(null);
  const { isSingleFile, file, index, onChange, onRemove } = props;

  const handleImageClick = (e) => {
    e.stopPropagation();

    fileInputRef.current.click();
  };

  return (
    <FileRowWrapper>
      {!isSingleFile && <Order>{index + 1}</Order>}

      <Thumbnail onClick={handleImageClick}>
        {file.url ? <ThumbImg src={file.url} /> : <ThumbFileImg file={file} />}
      </Thumbnail>

      <FileMeta>
        <FileMetaValue>
          {file.name} {file.type ? `[${file.type}]` : ''}
        </FileMetaValue>
        <FileSize file={file} />
        {/*<FileMetaValue>
          {moment(file.lastModifiedDate).format('YYYY-MM-DD')}
        </FileMetaValue>*/}
      </FileMeta>

      <ActionButton
        danger
        onClick={(e) => {
          e.stopPropagation();
          onRemove(index);
        }}
        label={<Remove />}
      />

      {!file.url && <EditIndicator editType={EditType.NEW} />}

      <File
        ref={fileInputRef}
        accept={'image/jpeg, image/png'}
        onChange={(e) => onChange(e.target.files[0], index)}
      />
    </FileRowWrapper>
  );
};

const AddFileRowWrapper = styled.div`
  outline: none;
  user-select: none;
  margin-top: 0.5rem;
  padding: 1rem;
  height: 8rem;
  background-color: #eee;
  border: 0.25rem dashed #999;
  color: #999;
  font-size: 2rem;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AddFileRow = (props) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      props.onChange(acceptedFiles);
    },
  });

  const message = useMedia(
    ['(min-width: 600px)'],
    ["Drag 'n' drop some files here, or click to select image"],
    'Tap to select image'
  );

  return (
    <AddFileRowWrapper {...getRootProps()}>
      {message}
      <File {...getInputProps()} />
    </AddFileRowWrapper>
  );
};

const PopupFileButton = styled.div`
  width: 8rem;
  height: 8rem;
  background-color: #eee;
  border: 0.25rem dashed #999;
  color: #999;
  font-size: 2rem;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const BannerPopupRow = (props) => {
  const fileInputRef = useRef(null);
  const { file, index, onChange, onRemove } = props;

  const handleImageClick = (e) => {
    e.stopPropagation();

    fileInputRef.current.click();
  };

  return (
    <FileRowWrapper>
      {file ? (
        <Thumbnail onClick={handleImageClick}>
          {file.url ? (
            <ThumbImg src={file.url} />
          ) : (
            <ThumbFileImg file={file} />
          )}
        </Thumbnail>
      ) : (
        <PopupFileButton onClick={handleImageClick}>
          <Add size={'3rem'} fill={'#999'} />
          {'Popup'}
        </PopupFileButton>
      )}

      {file && (
        <Absolute top={'0.25rem'} right={'0.25rem'}>
          <ActionButton
            size={'2rem'}
            danger
            onClick={(e) => {
              e.stopPropagation();
              onRemove(index);
            }}
            label={<Remove size={'1rem'} />}
          />
        </Absolute>
      )}

      {file && !file.url && <EditIndicator editType={EditType.NEW} />}

      <File
        ref={fileInputRef}
        accept={'image/jpeg, image/png'}
        onChange={(e) => onChange(e.target.files[0], index)}
      />
    </FileRowWrapper>
  );
};
