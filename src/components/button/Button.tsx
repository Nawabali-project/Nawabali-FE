import styled, { css } from 'styled-components';

type ButtonStyleProps = {
  type?: string;
  size?: 'small' | 'medium' | 'default';
  color?: 'blue' | 'default';
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
  border-radius: 7px;
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
  default: css`
    width: 100%;
  `,
};

const buttonType = {
  blue: css`
    background-color: #00a3ff;
    color: white;
    border: none;
    &:hover {
      background-color: white;
      color: #00a3ff;
      border: 1px solid #00a3ff;
    }
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
