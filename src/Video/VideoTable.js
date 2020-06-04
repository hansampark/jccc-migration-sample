/**
 * VideoTable
 * @flow
 */
import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import {
  Errors,
  FlexCenter,
  Spinner,
  Table,
  FlexRow,
  FlexColumn,
  FlexFill,
} from '../components';
const { StackTrace } = Errors;

const TruncatedText = styled.div`
  font-size: 0.7rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (min-width: 801px) {
    font-size: 1rem;
  }
`;

// const WrappedText = styled.div`
//   word-wrap: break-word;
//   overflow-wrap: break-word;
// `;

const COLUMNS = [
  // {
  //   key: 'id',
  //   label: 'ID',
  //   width: '150px',
  //   align: 'center',
  //   formatter: value => value
  // },
  {
    key: 'date',
    label: 'Date',
    width: '20%',
    headerAlign: 'flex-start',
    formatter: (value, record) => (
      <FlexRow justifyContent={'flex-start'} style={{ width: '100%' }}>
        <FlexFill
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <FlexRow>
            <TruncatedText>{moment(value).format('YYYY-MM-DD')}</TruncatedText>
          </FlexRow>
        </FlexFill>
      </FlexRow>
    ),
  },
  // {
  //   key: 'email',
  //   label: 'Email',
  //   width: '300px',
  //   formatter: value => (value ? <EmailLink email={value} /> : null)
  // },
  {
    key: 'title',
    label: 'Title',
    width: '70%',
    headerAlign: 'flex-start',
    formatter: (value, record) => (
      <FlexColumn style={{ width: '100%' }}>
        <TruncatedText>{value}</TruncatedText>
        {/*<WrappedText>{RoleDescription[record.role]}</WrappedText>*/}
      </FlexColumn>
    ),
  },
  // {
  //   key: 'roleDescription',
  //   label: 'Role Description',
  //   width: '250px',
  //   align: 'left',
  //   formatter: (value, record) => (
  //     <TruncatedText>{RoleDescription[record.role]}</TruncatedText>
  //   )
  // }
];

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  height: 100%;
  width: 100%;
`;

type Props = {
  error: Object,
  loading: boolean,
  data: Object[],
  onRowClick: Function,
};

export default class VideoTable extends Component {
  props: Props;

  render() {
    const { error, loading, data, onRowClick } = this.props;

    if (error) {
      return (
        <FlexCenter>
          {error.graphQLErrors ? (
            error.graphQLErrors.map((err) => (
              <StackTrace>{err.message}</StackTrace>
            ))
          ) : (
            <StackTrace>{error.message}</StackTrace>
          )}
        </FlexCenter>
      );
    }

    if (loading) {
      return (
        <FlexCenter style={{ height: '100%' }}>
          <Spinner color={'#2196f3'} size={40} />
        </FlexCenter>
      );
    }

    return (
      <Container>
        <Table
          columns={COLUMNS}
          data={data}
          height={'100%'}
          width={'100%'}
          rowHeight={'30px'}
          onRowClick={onRowClick}
        />
      </Container>
    );
  }
}
