import styled from 'styled-components';

const Img = styled.img`
  pointer-events: none;
  width: ${(props) => props.size || props.width};
  height: ${(props) => props.size || props.height};
  object-fit: ${(props) => props.resizeMode};
  border-radius: ${(props) => props.borderRadius};
`;

Img.defaultProps = {
  width: 'auto',
  height: 'auto',
  resizeMode: 'contain',
  borderRadius: 'inherit',
};

export default Img;
