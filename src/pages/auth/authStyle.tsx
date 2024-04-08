import styled from 'styled-components';

export const StyledLabel = styled.label`
  font-weight: 600;
`;

export const AuthInput = styled.input`
  margin: 0;
  padding: 0;
  height: 35px;
  width: 100%;
  border: 1px solid gray;
  border-radius: 5px;
`;

export const AuthButton = styled.button`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 35px;
  border: 1px solid gray;
  border-radius: 5px;
`;

export const AuthDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SideDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const BottomDiv = styled.div`
  display: flex;
  justify-content: center;
`;

export const WarnSpan = styled.span`
  color: red;
  font-size: 0.7rem;
`;

export const InfoSpan = styled.span`
  color: black;
  font-size: 0.7rem;
`;
