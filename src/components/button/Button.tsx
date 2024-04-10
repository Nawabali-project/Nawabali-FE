import styled, { css } from 'styled-components';

type ButtonStyleProps = {
  type?: string;
  size: 'small' | 'medium' | 'large';
  color: 'light' | 'dark';
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

  ${(props) => buttonSize[props.size]}
  ${(props) => buttonType[props.color]}
`;

const buttonSize = {
  small: css`
    width: 120px;
  `,
  medium: css`
    width: 250px;
  `,
  large: css`
    width: 100%;
  `,
};

const buttonType = {
  light: css`
    background-color: #dadada;
    color: black;
    &:hover {
      background-color: #a8a8a8;
      color: black;
    }
  `,
  dark: css`
    background-color: #585656;
    color: white;
    &:hover {
      background-color: grey;
      color: black;
    }
  `,
};
