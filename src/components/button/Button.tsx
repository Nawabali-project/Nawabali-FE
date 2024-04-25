import styled, { css } from 'styled-components';

type ButtonStyleProps = {
  type?: string;
  size?: 'small' | 'medium' | 'check' | 'chat' | 'default';
  color?: 'blue' | 'yellow' | 'default';
  disabled?: boolean;
};

interface ButtonProps extends ButtonStyleProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const Button = ({ children, onClick, ...styleProps }: ButtonProps) => {
  return (
    <StyledButton {...styleProps} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button<ButtonStyleProps>`
  border: 1px solid gray;
  border-radius: 5px;
  padding: 5px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  ${(props) => buttonSize[props.size ?? 'default']}
  ${(props) => buttonType[props.color ?? 'default']}
`;

const buttonSize = {
  small: css`
    border-radius: 25px;
    height: 25px;
    color: #757575;
    border: 2px solid #757575;
    font-weight: 600;
  `,
  medium: css`
    width: 250px;
  `,
  check: css`
    width: 60px;
    font-size: 12px;
    margin-left: 5px;
  `,
  default: css`
    width: 100%;
  `,
  chat: css`
    border-radius: 25px;
    height: 25px;
    color: #757575;
    border: 2px solid #757575;
  `,
};

const buttonType = {
  blue: css`
    color: white;
    border: none;
    background-color: #00a3ff;
    &:disabled {
      cursor: not-allowed;
      background-color: #00a2ff68;
    }
  `,
  yellow: css`
    background-color: #fee500;
    color: black;
    border: none;
  `,
  default: css`
    background-color: white;
    color: #757575;
    &:hover {
      background-color: #757575;
      color: white;
    }
  `,
};
