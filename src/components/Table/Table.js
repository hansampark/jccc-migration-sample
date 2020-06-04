/**
 * Table
 * @flow
 */
import React from 'react';
import styled from 'styled-components';
import { HeaderRow, DataRow } from './TableRow';
import ScrollView from '../ScrollView';

const Container = styled.div`
  width: ${(props) => props.width || '100%'};
  height: ${(props) => props.height || '100%'};
`;

const StickyHeader = styled.div`
  position: sticky;
  top: ${(props) => props.top || 0};
  z-index: 1;
`;

const StyledTable = styled.div`
  width: ${(props) => props.width || '100%'};
  border-collapse: collapse;
  table-layout: fixed;
  min-width: ${(props) => props.midWidth || 'auto'};
  max-width: ${(props) => props.maxWidth || 'none'};
`;

const Head = styled.section`
  margin: 0;
  padding: 0;
`;

const Body = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  height: ${(props) => props.height || '100%'};
`;

// TODO: Implement windowing technique for large data perf
export default class Table extends React.Component {
  static defaultProps = {
    rowHeight: '50px',
  };

  render() {
    const {
      top,
      width,
      height,
      rowHeight,
      columns,
      data,
      style,
      onScroll,
      onRowClick,
    } = this.props;
    const count = data.length;
    const totalHeight = parseInt(rowHeight, 10) * count;

    return (
      <Container width={width} height={height} style={style}>
        <StickyHeader top={top}>
          <StyledTable width={width}>
            <Head>
              <HeaderRow columns={columns} />
            </Head>
          </StyledTable>
        </StickyHeader>

        <ScrollView onScroll={onScroll}>
          <StyledTable width={width}>
            <Body height={totalHeight}>
              {data.map((record, index) => (
                <DataRow
                  key={record.id}
                  columns={columns}
                  record={record}
                  height={rowHeight}
                  style={{ top: index * parseInt(rowHeight, 10) }}
                  onClick={() => onRowClick(record, index)}
                />
              ))}
            </Body>
          </StyledTable>
        </ScrollView>
      </Container>
    );
  }
}
