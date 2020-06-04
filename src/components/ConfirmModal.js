import React from 'react';
import styled from 'styled-components';
import Modal from './Modal';
import { Button } from './Buttons';

const Title = styled.header`
  font-size: 1.5rem;
  padding: 1rem;
  font-weight: 400;
  border-bottom: 1px solid #cccccc;
`;

const Message = styled.section`
  padding: 1rem;
`;

export default class ConfirmModal extends React.Component {
  render() {
    const { title, message, onCancel, onSubmit } = this.props;

    return (
      <Modal
        fullscreen={false}
        height={'200px'}
        closable={false}
        actions={[
          <Button
            key="cancel"
            label={'No'}
            onClick={onCancel}
            style={{ marginRight: '1rem' }}
          />,
          <Button key="danger" label={'Yes'} danger onClick={onSubmit} />,
        ]}
        onClose={onCancel}
      >
        {title && <Title>{title}</Title>}
        <Message>{message}</Message>
      </Modal>
    );
  }
}
