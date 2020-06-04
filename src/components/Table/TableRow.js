/**
 * MemberTableRow
 * @flow
 */
import React from 'react';
import styled from 'styled-components';

const Align = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
};

const Row = styled.div`
  display: flex;
  align-items: center;
  width: ${(props) => props.width || '100%'};
  height: ${(props) => props.height || 'auto'};
  border-bottom: 1px solid #e0e0e0;
  white-space: nowrap;

  &:nth-child(even) {
    background-color: #f8f8f8;
  }

  &:hover {
    background-color: rgba(41, 182, 246, 0.075);
  }
`;

const HeaderCell = styled.div`
  display: inline-flex;
  margin: 0;
  padding: 10px;
  justify-content: ${(props) => Align[props.align || 'center']};
  width: ${(props) => props.width || 'auto'};
  color: #3c3c3c;
  font-weight: 700;
  line-height: 1.2;
  background-color: rgba(255, 255, 255, 0.95);
  overflow: hidden;
  white-space: nowrap;
  min-width: 30px;
  text-overflow: ellipsis;
`;

const DataCell = styled.div`
  display: inline-flex;
  margin: 0;
  padding: 10px;
  justify-content: ${(props) => Align[props.align || 'center']};
  width: ${(props) => props.width || 'auto'};
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  min-width: 30px;
  text-overflow: ellipsis;
`;

export const HeaderRow = ({ width, height, columns }) => (
  <Row width={width} height={height}>
    {columns.map((col) => (
      <HeaderCell
        key={col.key}
        width={col.width}
        align={col.headerAlign || col.align}
        style={col.headerStyle}
      >
        {col.label}
      </HeaderCell>
    ))}
  </Row>
);

export const DataRow = ({ width, height, columns, record, style, onClick }) => (
  <Row width={width} height={height} onClick={onClick} style={style}>
    {columns.map((col) => (
      <DataCell
        key={col.key}
        width={col.width}
        align={col.align}
        style={col.style}
      >
        {col.formatter
          ? col.formatter(record[col.key], record, col)
          : record[col.key]}
      </DataCell>
    ))}
  </Row>
);
