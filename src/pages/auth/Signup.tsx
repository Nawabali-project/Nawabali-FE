import { useInput } from '@/hooks/useInput';
import Modal from '../../components/modal/Modal';
import {
  StyledLabel,
  AuthDiv,
  BottomDiv,
  AuthInput,
} from '@pages/auth/authStyle';
import Button from '@/components/button/Button';
import { signUp } from '@/api/auth/user';
import { emailCheck, pwCheck, nicknameCheck } from '@/utils/regex/regex';
import { useState } from 'react';

interface SignupProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setModalType: (modalType: string) => void;
}

const Signup: React.FC<SignupProps> = (props) => {
  const [
    { email, nickname, password, confirmPassword, city, district },
    resetInput,
  ] = useInput({
    email: '',
    nickname: '',
    password: '',
    confirmPassword: '',
    admin: 'false',
    certificated: 'true',
    city: '서울시',
    username: '홍홍홍',
    district: '마포구',
  });
  const [emailValidityMessage, setEmailValidityMessage] = useState<string>('');
  const [pwValidityMessage, setPwValidityMessage] = useState<string>('');
  const [pwConfirmMessage, setPwConfirmMessage] = useState<string>('');
  const [nicknameValidityMessage, setNicknameValidityMessage] =
    useState<string>('');

  // 이메일 유효성 검사
  const validateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const isValid = emailCheck(value);
    if (!isValid) {
      setEmailValidityMessage('제대로 된 이메일을 입력해주세요');
    } else {
      setEmailValidityMessage('');
    }
  };

  // 비밀번호 유효성 검사
  const validatePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const isValid = pwCheck(value);
    if (!isValid) {
      setPwValidityMessage(
        '비밀번호는 영문, 숫자, 특수문자 포함 8~15자 입니다.',
      );
    } else {
      setPwValidityMessage('');
    }
  };

  const handleConfirmPwChange = (value: string) => {
    if (password !== value) {
      setPwConfirmMessage('비밀번호가 일치하지 않습니다.');
    } else {
      setPwConfirmMessage('');
    }
  };

  // 닉네임 유효성 검사
  const validateNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const isValid = nicknameCheck(value);
    if (!isValid) {
      setNicknameValidityMessage('닉네임은 특수문자 제외 3자~10자 입니다.');
    } else {
      setNicknameValidityMessage('');
    }
  };

  const handleSubmit = async () => {
    const user = {
      email,
      nickname,
      password,
      confirmPassword,
      city,
      district,
    };
    try {
      await signUp(user);
      resetInput();
      console.log('회원가입 정보:', {
        email,
        nickname,
        password,
        confirmPassword,
        city,
        district,
      });
      props.setIsModalOpen(false);
    } catch (error) {
      console.error('회원가입 오류:', error);
      resetInput();
    }
  };

  const handleLoginClick = () => {
    props.setModalType('login');
  };

  return (
    <Modal size="auth">
      <span onClick={() => props.setIsModalOpen(false)}>X</span>
      <h1>회원가입</h1>
      <Button size="large" color="normal">
        카카오로 3초만에 가입하기
      </Button>
      <StyledLabel>이메일</StyledLabel>
      <AuthInput
        type="text"
        name="email"
        value={email}
        onChange={validateEmail}
        placeholder="이메일"
      />
      <span>{emailValidityMessage}</span>
      <StyledLabel>비밀번호</StyledLabel>
      <AuthDiv>
        <span>영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.</span>
      </AuthDiv>
      <AuthInput
        type="password"
        name="password"
        value={password}
        onChange={validatePw}
        placeholder="비밀번호"
      />
      <span>{pwValidityMessage}</span>
      <StyledLabel>비밀번호 확인</StyledLabel>
      <AuthInput
        type="password"
        name="confirmPassword"
        value={confirmPassword}
        onChange={(e) => handleConfirmPwChange(e.target.value)}
        placeholder="비밀번호확인"
      />
      <span>{pwConfirmMessage}</span>
      <AuthDiv>
        <StyledLabel>닉네임</StyledLabel>
        <span>다른 유저와 겹치지 않도록 입력해주세요. (3~10자)</span>
      </AuthDiv>
      <AuthInput
        type="text"
        name="nickname"
        value={nickname}
        onChange={validateNickname}
        placeholder="닉네임"
      />
      <span>{nicknameValidityMessage}</span>
      <Button size="large" color="normal" onClick={handleSubmit}>
        회원가입하기
      </Button>
      <BottomDiv>
        <span>이미 계정이 있으신가요?</span>
        <span onClick={handleLoginClick}>로그인하기</span>
      </BottomDiv>
    </Modal>
  );
};

export default Signup;
