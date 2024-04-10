import Modal from '../../components/modal/Modal';
import { useInput } from '@/hooks/useInput';
import { login } from '@/api/auth';
import {
  StyledLabel,
  AuthInput,
  AuthDiv,
  SideDiv,
  BottomDiv,
} from '@pages/auth/authStyle';
import Button from '@/components/button/Button';
import { Cookies } from 'react-cookie';

interface LoginProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setModalType: (modalType: string) => void;
}

const Login: React.FC<LoginProps> = ({ setIsModalOpen, setModalType }) => {
  const cookie = new Cookies();
  const [{ email, password }, onInputChange, resetInput] = useInput({
    email: '',
    password: '',
  });

  const handleSubmit = async () => {
    const user = { email, password };
    try {
      const data = await login(user);
      resetInput();
      setIsModalOpen(false);
      cookie.set('accessToken', data['authorization'].slice(7));
    } catch (error) {
      console.error('로그인 오류:', error);
    }
  };

  const handleKakaoLogin = async () => {
    const REDIRECT_URI = `${import.meta.env.VITE_KAKAO_REDIRECT_URI}`;
    const CLIENT_ID = `${import.meta.env.VITE_KAKAO_RESTAPI_KEY}`;
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    console.log('KAKAO_AUTH_URL:', KAKAO_AUTH_URL);

    location.replace(`${KAKAO_AUTH_URL}`);
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
        <img
          src="/assets/images/kakaoLoginImg.png"
          style={{ cursor: 'pointer' }}
          onClick={handleKakaoLogin}
        />
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
