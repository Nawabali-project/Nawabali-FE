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

interface SignupProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setModalType: (modalType: string) => void;
}

const Signup: React.FC<SignupProps> = (props) => {
  const [
    {
      email,
      nickname,
      password,
      confirmPassword,
      admin,
      certificated,
      city,
      username,
      district,
    },
    onInputChange,
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

  const handleSubmit = async () => {
    const user = {
      email,
      nickname,
      password,
      confirmPassword,
      admin,
      certificated,
      city,
      username,
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
        admin,
        certificated,
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
        onChange={onInputChange}
        placeholder="이메일"
      />
      <StyledLabel>비밀번호</StyledLabel>
      <AuthDiv>
        <span>영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.</span>
      </AuthDiv>
      <AuthInput
        type="password"
        name="password"
        value={password}
        onChange={onInputChange}
        placeholder="비밀번호"
      />
      <StyledLabel>비밀번호 확인</StyledLabel>
      <AuthInput
        type="password"
        name="confirmPassword"
        value={confirmPassword}
        onChange={onInputChange}
        placeholder="비밀번호확인"
      />
      <AuthDiv>
        <StyledLabel>닉네임</StyledLabel>
        <span>다른 유저와 겹치지 않도록 입력해주세요. (2~10자)</span>
      </AuthDiv>
      <AuthInput
        type="text"
        name="nickname"
        value={nickname}
        onChange={onInputChange}
        placeholder="비밀번호확인"
      />
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
