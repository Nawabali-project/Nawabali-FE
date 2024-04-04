import Modal from '../../components/modal/Modal';
import { useInput } from '@/hooks/useInput';
import { Cookies } from 'react-cookie';
import { login } from '@/api/auth/user';
import {
  StyledLabel,
  AuthInput,
  AuthDiv,
  SideDiv,
  BottomDiv,
} from '@pages/auth/authStyle';
import Button from '@/components/button/Button';
import SocialKaKao from '@/api/kakao/SocialKaKao';
import useAuthStore from '@/store/AuthState';

interface LoginProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setModalType: (modalType: string) => void;
}

const Login: React.FC<LoginProps> = ({ setIsModalOpen, setModalType }) => {
  const [{ email, password }, onInputChange, resetInput] = useInput({
    email: '',
    password: '',
  });
  const cookies = new Cookies();
  const { setLoggedIn } = useAuthStore();

  const handleSubmit = async () => {
    const user = { email, password };
    try {
      const response = await login(user);
      cookies.set('refreshToken', response.refreshToken);
      localStorage.setItem('accessToken', response.accessToken);
      resetInput();
      setLoggedIn(true);
      setIsModalOpen(false);
    } catch (error) {
      console.error('로그인 오류:', error);
    }
  };

  const handleSignupClick = () => {
    setModalType('signup');
  };

  return (
    <Modal>
      <div style={{ padding: '20px' }}>
        <span onClick={() => setIsModalOpen(false)}>X</span>
        <p>로그인</p>
        <AuthDiv>
          <StyledLabel>이메일</StyledLabel>
          <AuthInput
            type="text"
            name="email"
            value={email}
            onChange={onInputChange}
            placeholder="이메일"
          />
        </AuthDiv>
        <AuthDiv>
          <StyledLabel>비밀번호</StyledLabel>
          <AuthInput
            type="password"
            name="password"
            value={password}
            onChange={onInputChange}
            placeholder="비밀번호"
          />
        </AuthDiv>
        <Button size="large" color="normal" onClick={handleSubmit}>
          로그인
        </Button>
        <SocialKaKao />
        <SideDiv>
          <span>로그인 유지</span>
          <span>아이디/비밀번호 찾기</span>
        </SideDiv>
        <BottomDiv>
          <span>함께 동네를 꾸며볼까요?</span>
          <span onClick={handleSignupClick}>회원가입하기</span>
        </BottomDiv>
      </div>
    </Modal>
  );
};

export default Login;
