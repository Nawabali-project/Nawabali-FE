import { useRef } from 'react';
import styled from 'styled-components';
import { IoIosSearch } from 'react-icons/io';

interface InputProps {
  type: string;
  value: string;
  placeholder?: string;
  forwardRef?: React.Ref<HTMLInputElement>;
}

export const InputField = ({
  type,
  value,
  placeholder,
  forwardRef,
}: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Input
      type={type}
      value={value}
      placeholder={placeholder}
      ref={forwardRef || inputRef}
    />
  );
};

export const AddressInput = ({
  type,
  value,
  placeholder,
  forwardRef,
}: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <InputContainer>
      <IoIosSearch style={{ color: 'gray' }} />
      <Input
        type={type}
        value={value}
        placeholder={placeholder}
        ref={forwardRef || inputRef}
      />
    </InputContainer>
  );
};

const InputContainer = styled.div`
  border: 1px solid gray;
  border-radius: 10px;
  height: 30px;
  width: 400px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 10px;
  overflow: hidden;

  input {
    border: none;
  }
`;

const Input = styled.input`
  height: 30px;
  width: 350px;
  font-size: 13px;
  &:focus {
    outline: none;
  }
  border: 1px solid gray;
  border-radius: 10px;
`;
