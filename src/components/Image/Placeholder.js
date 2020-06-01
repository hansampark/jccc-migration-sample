import styled from 'styled-components';

const Placeholder = styled.div`
  pointer-events: none;
  background-color: #cecece;
  width: ${(props) => props.size || props.width};
  height: ${(props) => props.size || props.height};
  object-fit: ${(props) => props.resizeMode};
  border-radius: ${(props) => props.borderRadius};
`;

export default Placeholder;
