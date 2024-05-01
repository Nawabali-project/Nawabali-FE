import Modal from '../modal/Modal';
import { useInput } from '@/hooks/useInput';
import { getUserInfo, login as apiLogin } from '@/api/auth';
import {
  StyledLabel,
  AuthInput,
  AuthDiv,
  SideDiv,
  BottomDiv,
  Logo,
} from '@/components/auth/authStyle';
import Button from '@/components/button/Button';
import useAuthStore from '@/store/AuthState';
import { AxiosError } from 'axios';
import { Cookies } from 'react-cookie';

interface LoginProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setModalType: (modalType: string) => void;
}

const Login: React.FC<LoginProps> = ({ setIsModalOpen, setModalType }) => {
  const [{ email, password }, onInputChange, resetInput] = useInput({
    email: '',
    password: '',
  });

  const { login } = useAuthStore();
  const cookie = new Cookies();

  const handleSubmit = async () => {
    console.log('로그인버튼 눌렸다...');

    const user = { email, password };
    try {
      const resUserInfo = await apiLogin(user);
      if (!resUserInfo || typeof resUserInfo === 'number') {
        throw new Error('API 로그인 호출 실패: 반환된 정보가 없습니다.');
      }
      // const userToken = resUserInfo.headers;
      resetInput();
      setIsModalOpen(false);
      // const token = userToken['authorization'].slice(7);
      const token = cookie.get('Authorization');
      if (token) {
        const userInfo = await getUserInfo();
        login(userInfo);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('로그인 오류:', error.message);
        alert(
          '로그인 실패: ' + (error.response?.data.message || error.message),
        );
      } else {
        console.error('Unexpected error:', error);
        alert('로그인 실패: 알 수 없는 오류');
      }
    }
  };

  const handleKakaoLogin = async () => {
    const REDIRECT_URI = `${import.meta.env.VITE_KAKAO_REDIRECT_URI}`;
    const CLIENT_ID = `${import.meta.env.VITE_KAKAO_RESTAPI_KEY}`;
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    location.replace(`${KAKAO_AUTH_URL}`);
  };

  const handleSignupClick = () => {
    setModalType('signup');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <Modal
      isAlertModalOpen={false}
      size="auth"
      onClose={() => setIsModalOpen(false)}
    >
      <div style={{ padding: '0 20px' }}>
        <Logo />
        <p style={{ textAlign: 'center', fontWeight: '600', fontSize: '20px' }}>
          로그인
        </p>
        <div
          style={{
            width: '260px',
            margin: '10px',
            border: '1px solid #F1F1F1',
          }}
        />
        <AuthDiv>
          <StyledLabel>이메일</StyledLabel>
          <AuthInput
            type="text"
            name="email"
            value={email}
            onChange={onInputChange}
            placeholder="이메일"
            style={{ width: '278px' }}
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
            style={{ width: '278px', marginBottom: '15px' }}
            onKeyDown={handleKeyDown}
          />
        </AuthDiv>
        <Button color="blue" onClick={handleSubmit}>
          로그인
        </Button>
        <img
          src="/assets/images/kakaoLoginImg.png"
          style={{
            cursor: 'pointer',
            width: '300px',
            height: '35px',
            objectFit: 'cover',
            borderRadius: '5px',
            margin: '5px 0',
          }}
          onClick={handleKakaoLogin}
          alt="kakao login"
        />
        <SideDiv
          style={{
            width: '295px',
            height: '13px',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <span
            style={{ fontSize: '13px', cursor: 'pointer', color: '#757575' }}
          >
            아이디 / 비밀번호 찾기
          </span>
        </SideDiv>
        <BottomDiv style={{ marginTop: '60px', fontSize: '13px' }}>
          <span>함께 동네를 꾸며볼까요?</span>
          <span
            style={{
              marginLeft: '10px',
              color: '#00a3ff',
              fontWeight: '700',
              cursor: 'pointer',
              textDecoration: 'underLine',
            }}
            onClick={handleSignupClick}
          >
            회원가입하기
          </span>
        </BottomDiv>
      </div>
    </Modal>
  );
};

export default Login;
