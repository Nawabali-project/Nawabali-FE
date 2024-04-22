import styled from 'styled-components';

export const StyledLabel = styled.label`
  font-weight: 600;
  margin: 10px 0 3px;
  font-weight: 800;
  font-size: 15px;
`;

export const AuthInput = styled.input`
  margin: 0;
  padding: 0 10px;
  height: 33px;
  width: 100%;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  font-size: 11px;
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
  align-items: center;
`;

export const WarnSpan = styled.span`
  color: red;
  font-size: 0.7rem;
`;

export const InfoSpan = styled.span`
  color: black;
  font-size: 0.7rem;
`;

export const Logo = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto;
  box-sizing: border-box;
  background-image: url('/assets/images/squareLogo.png');
  background-size: cover;
`;

export const Result = styled.div`
  padding: 5px;
  margin: 0;
  font-size: 13px;
  cursor: pointer;
  &:hover {
    background-color: #dfdede;
  }
`;
