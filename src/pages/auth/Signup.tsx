import { useInput } from '@/hooks/useInput';
import Modal from '../../components/modal/Modal';
import {
  StyledLabel,
  AuthButton,
  AuthDiv,
  BottomDiv,
} from '@pages/auth/authStyle';

interface LoginSignupProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Signup: React.FC<LoginSignupProps> = (props) => {
  const [
    {
      email,
      nickname,
      password,
      confirmPassword,
      admin,
      certificated,
      city,
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
    district: '마포구',
  });

  const handleSubmit = async () => {
    try {
      // 회원가입 처리 로직 작성
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

  return (
    <Modal size="auth">
      <span onClick={() => props.setIsModalOpen(false)}>X</span>
      <h1>회원가입</h1>
      <AuthButton>카카오로 3초만에 가입하기</AuthButton>
      <StyledLabel>이메일</StyledLabel>
      <input
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
      <input
        type="password"
        name="password"
        value={password}
        onChange={onInputChange}
        placeholder="비밀번호"
      />
      <StyledLabel>비밀번호 확인</StyledLabel>
      <input
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
      <input
        type="text"
        name="nickname"
        value={nickname}
        onChange={onInputChange}
        placeholder="비밀번호확인"
      />
      <AuthButton type="submit" onClick={handleSubmit}>
        회원가입하기
      </AuthButton>
      <BottomDiv>
        <span>이미 계정이 있으신가요?</span>
        <span>로그인하기</span>
      </BottomDiv>
    </Modal>
  );
};

export default Signup;
