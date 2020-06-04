import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Color from 'color';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2000;
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${(props) => props.backgroundColor};
  opacity: 0.65;
`;

const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-width: 320px;
  min-height: ${(props) => props.height || '569px'};
  background-color: ${(props) => props.backgroundColor};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  overflow: auto;

  @media screen and (min-width: 414px) {
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    width: ${(props) => props.width || (props.fullscreen ? '90%' : '50%')};
    height: ${(props) => props.height || (props.fullscreen ? '90%' : '60%')};
    max-width: ${(props) => (props.fullscreen ? 'none' : '1920px')};
    max-height: ${(props) => (props.fullscreen ? 'none' : '960px')};
  }
`;

const ContentInner = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 50px;
  height: 50px;
  padding: 0;
  border: none;
  background-color: transparent;
  color: ${(props) =>
    Color(props.backgroundColor).luminosity() > 0.5 ? '#3c3c3c' : '#ffffff'};
  font-size: 3rem;
  font-weight: 400;
  cursor: pointer;

  @media screen and (min-width: 414px) {
    color: ${(props) =>
      Color(props.backdropColor).luminosity() > 0.5 ? '#3c3c3c' : '#ffffff'};
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: ${(props) => props.justifyContent};
  align-items: center;
  width: 100%;
  height: 60px;
  border-top: 1px solid #cccccc;
  padding: 0 1rem;
`;

export default class Modal extends React.Component {
  static defaultProps = {
    backgroundColor: 'white',
    backdropColor: 'black',
    closable: true,
  };

  render() {
    const {
      children,
      onClose,
      fullscreen,
      width,
      height,
      backgroundColor,
      backdropColor,
      closable,
      actions,
    } = this.props;

    return ReactDOM.createPortal(
      <Wrapper>
        <Backdrop backgroundColor={backdropColor} />
        <Content
          backgroundColor={backgroundColor}
          fullscreen={!!fullscreen}
          width={width}
          height={height}
        >
          <ContentInner>{children}</ContentInner>

          {actions && actions.length >= 1 && (
            <Actions
              justifyContent={actions.length <= 1 ? 'center' : 'flex-end'}
            >
              {actions.map((action) => action)}
            </Actions>
          )}
        </Content>
        {closable && (
          <CloseButton
            backdropColor={backdropColor}
            backgroundColor={backgroundColor}
            onClick={onClose}
          >
            &times;
          </CloseButton>
        )}
      </Wrapper>,
      document.querySelector('#modal')
    );
  }

  componentWillMount() {
    document.querySelector('html').style.overflow = 'hidden';
  }

  componentWillUnmount() {
    document.querySelector('html').style.overflow = null;
  }
}
