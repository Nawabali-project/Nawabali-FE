import { useRef } from 'react';
import Modal from '../../components/modal/Modal';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  StyledLabel,
  AuthInput,
  AuthButton,
  AuthDiv,
  BottomDiv,
} from '@pages/auth/authStyle';

interface FormValue {
  email: string;
  nickname: string;
  password: string;
  password_confirm: string;
}

interface LoginSignupProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Signup: React.FC<LoginSignupProps> = (props) => {
  const { register, handleSubmit, watch } = useForm<FormValue>();

  const handleCloseModal = () => {
    props.setIsModalOpen(false);
  };

  const passwordRef = useRef<string | null>(null);
  passwordRef.current = watch('password');

  const onSubmitHandler: SubmitHandler<FormValue> = (data) => {
    console.log(data);
  };

  return (
    <Modal>
      <span onClick={handleCloseModal}>X</span>
      <h1>회원가입</h1>
      <AuthButton>카카오로 3초만에 가입하기</AuthButton>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <StyledLabel>이메일</StyledLabel>
        <AuthInput
          {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
          type="email"
          placeholder="이메일"
        />
        <StyledLabel>비밀번호</StyledLabel>
        <AuthDiv>
          <span>영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.</span>
        </AuthDiv>
        <AuthInput
          {...register('password', { required: true, minLength: 6 })}
          type="password"
          placeholder="비밀번호"
        />
        <StyledLabel>비밀번호 확인</StyledLabel>
        <AuthInput
          {...register('password_confirm', {
            required: true,
            validate: (value) => value === passwordRef.current,
          })}
          type="password"
          placeholder="비밀번호 확인"
        />
        <AuthDiv>
          <StyledLabel>닉네임</StyledLabel>
          <span>다른 유저와 겹치지 않도록 입력해주세요. (2~10자)</span>
        </AuthDiv>
        <AuthInput
          {...register('nickname', { required: true, maxLength: 10 })}
          placeholder="별명(2~10자)"
        />
        <AuthButton type="submit">회원가입하기</AuthButton>
        <BottomDiv>
          <span>이미 계정이 있으신가요?</span>
          <span>로그인하기</span>
        </BottomDiv>
      </form>
    </Modal>
  );
};

export default Signup;
