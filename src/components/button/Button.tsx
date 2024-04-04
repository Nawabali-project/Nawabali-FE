import styled, { css } from 'styled-components';

type ButtonStyleProps = {
  size: 'small' | 'medium';
  color: 'normal';
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
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  ${(props) => buttonSize[props.size]}
  ${(props) => buttonType[props.color]}
`;

const buttonSize = {
  small: css`
    width: 400px;
  `,
  medium: css`
    width: 150px;
    height: 30px;
  `,
};

const buttonType = {
  normal: css`
    background-color: gray;
    color: white;
    &:hover {
      background-color: lightgray;
      color: black;
    }
  `,
};
