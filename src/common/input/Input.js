import styled from 'styled-components';

const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  margin: 5px;
  padding: 12px 16px;
  border: 2px solid;
  border-radius: 15px;
  font-size: 15px;

  &:focus {
    box-shadow: 0 0 0 4px rgba(180, 63, 253, 0.5);
    outline: 0;
  }
`;

export default Input;
