/**
 * WeeklyImageList
 * @flow
 */
import React from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FileRow } from '../components/FileControls';

const List = styled.div`
  list-style: none;
  margin: 0;
  padding: 0;
  background-color: ${({ isDraggingOver }) =>
    isDraggingOver ? 'lightblue' : 'lightgray'};
`;

const ListItem = styled.div`
  width: 100%;
  padding: 0;
  margin: 0;
  background-color: #ffffff;

  position: relative;
  padding: 0.5rem 1rem;
  height: 8rem;
  max-width: 82vw;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  color: #3c3c3c;

  & + & {
    margin-top: 0.5rem;
  }
`;

const WeeklyImageListItem = ({ index, file, onChange, onRemove }) => (
  <Draggable draggableId={file.url || file.name} index={index}>
    {(provided, snapshot) => (
      <ListItem
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <FileRow
          index={index}
          file={file}
          onChange={onChange}
          onRemove={onRemove}
        />
      </ListItem>
    )}
  </Draggable>
);

const WeeklyImageList = (props) => {
  const { files, onChange, onRemove, onReorder } = props;

  const handleDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    onReorder({
      files,
      sourceIndex: result.source.index,
      destinationIndex: result.destination.index,
    });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId={'bannerList'} direction="vertical">
        {(provided, snapshot) => (
          <List
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {files.map((file, index) => (
              <WeeklyImageListItem
                key={file.url || file.name}
                index={index}
                file={file}
                onChange={onChange}
                onRemove={onRemove}
              />
            ))}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default WeeklyImageList;
