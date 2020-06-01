import React, { Component } from 'react';
import styled from 'styled-components';
import Paper from './Paper';
import Spinner from './Spinner';

const getColor = (props) => {
  if (props.primary) {
    return '#2196f3';
  }

  if (props.secondary) {
    return '#9C27B0';
  }

  if (props.danger) {
    return '#F44336';
  }

  return '#CECECE';
};

const Wrapper = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  font-size: 1.2rem;
  width: ${(props) => props.width || '160px'};
  height: ${(props) => props.height || '40px'};
  border: none;
  background-color: ${(props) => getColor(props)};
  color: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${(props) => (props.disabled ? 0.65 : 1)};

  &:active,
  &:focus {
    opacity: 0.9;
  }
`;

const IconWrapper = styled.span`
  display: inline-block;
  vertical-align: center;
  height: 24px;
  margin-right: 0.25rem;
`;

const Label = styled.span`
  display: inline-block;
`;

export class Button extends React.Component {
  static defaultProps = {
    type: 'button',
    loading: false,
  };

  render() {
    const {
      className,
      icon,
      label,
      onClick,
      type,
      loading,
      primary,
      secondary,
      danger,
      style,
      width,
      height,
      disabled,
    } = this.props;

    return (
      <Wrapper
        className={className}
        style={style}
        type={type}
        onClick={onClick}
        primary={primary}
        secondary={secondary}
        danger={danger}
        width={width}
        height={height}
        disabled={disabled || loading}
      >
        {icon && !loading && <IconWrapper>{icon}</IconWrapper>}
        {loading ? (
          <Spinner color={'#FFFFFF'} size={28} />
        ) : (
          <Label>{label}</Label>
        )}
      </Wrapper>
    );
  }
}

const CirclePaper = styled(Paper)`
  width: ${(props) => props.size || '56px'};
  height: ${(props) => props.size || '56px'};
  border-radius: 50%;
`;

const CircleButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  font-size: 1.2rem;
  width: ${(props) => props.size || '56px'};
  height: ${(props) => props.size || '56px'};
  border-radius: 50%;
  border: none;
  background-color: ${(props) => getColor(props)};
  color: #ffffff;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${(props) => (props.disabled ? 0.65 : 1)};
  transition: transform 0.3s ease-in-out;

  &:active,
  &:focus {
    opacity: 0.9;
  }

  ${(props) =>
    props.animated
      ? `&:hover {
    transform: rotate(90deg);
  }`
      : ''};
`;

export class ActionButton extends Component {
  static defaultProps = {
    type: 'button',
    loading: false,
  };

  state = { zDepth: 6 };

  render() {
    const {
      label,
      onClick,
      type,
      loading,
      primary,
      secondary,
      danger,
      style,
      size,
      disabled,
    } = this.props;
    const { zDepth } = this.state;

    return (
      <CirclePaper
        size={size}
        zDepth={zDepth}
        onMouseEnter={() => this.setState({ zDepth: 12 })}
        onMouseLeave={() => this.setState({ zDepth: 6 })}
        style={style}
      >
        <CircleButton
          type={type}
          onClick={onClick}
          primary={primary}
          secondary={secondary}
          danger={danger}
          size={size}
          disabled={disabled || loading}
        >
          {loading ? <Spinner color={'#FFFFFF'} size={28} /> : label}
        </CircleButton>
      </CirclePaper>
    );
  }
}

const SquareButton = styled.button`
  border: none;
  background-color: ${(props) => props.backgroundColor || 'transparent'};
  width: ${(props) => props.size || '40px'};
  height: ${(props) => props.size || '40px'};
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${(props) => (props.disabled ? 0.75 : 1)};
`;

export const IconButton = (props) => (
  <SquareButton
    type={'button'}
    onClick={props.onClick}
    size={props.size}
    backgroundColor={props.backgroundColor}
    style={props.style}
    disabled={props.disabled}
  >
    {props.icon}
  </SquareButton>
);

const ButtonAsLink = styled.button`
  border: none;
  box-shadow: none;
  color: lightblue;
  text-decoration: underline;
`;

export const LinkButton = (props) => {
  return (
    <ButtonAsLink type="button" onClick={props.onClick}>
      {props.label}
    </ButtonAsLink>
  );
};
