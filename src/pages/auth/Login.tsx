import { useRef } from 'react';
import Modal from '../../common/modal/Modal';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  StyledLabel,
  AuthInput,
  AuthButton,
  AuthDiv,
  SideDiv,
  BottomDiv,
} from '@pages/auth/authStyle';

interface FormValue {
  email: string;
  password: string;
}

interface LoginProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<LoginProps> = (props) => {
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
      <p>로그인</p>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <AuthDiv>
          <StyledLabel>이메일</StyledLabel>
          <AuthInput
            {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            type="email"
            placeholder="이메일"
          />
        </AuthDiv>
        <AuthDiv>
          <StyledLabel>비밀번호</StyledLabel>
          <AuthInput
            {...register('password', { required: true, minLength: 6 })}
            type="password"
            placeholder="비밀번호"
          />
        </AuthDiv>
      </form>
      <AuthButton type="submit">로그인</AuthButton>
      <AuthButton>카카오계정으로 시작하기</AuthButton>
      <SideDiv>
        <span>로그인 유지</span>
        <span>아이디/비밀번호 찾기</span>
      </SideDiv>
      <BottomDiv>
        <span>함께 동네를 꾸며볼까요?</span>
        <span>회원가입하기</span>
      </BottomDiv>
    </Modal>
  );
};

export default Login;
