import Modal from '../modal/Modal';
import { useInput } from '@/hooks/useInput';
import { getUserInfo, login as apiLogin } from '@/api/auth';
import {
  StyledLabel,
  AuthInput,
  AuthDiv,
  SideDiv,
  BottomDiv,
} from '@/components/auth/authStyle';
import Button from '@/components/button/Button';
import { Cookies } from 'react-cookie';
import useAuthStore from '@/store/AuthState';

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
  const { login } = useAuthStore();

  const handleSubmit = async () => {
    const user = { email, password };
    try {
      const resUserInfo = await apiLogin(user);
      if (!resUserInfo || typeof resUserInfo === 'number') {
        throw new Error('API 로그인 호출 실패: 반환된 정보가 없습니다.');
      }
      const userToken = resUserInfo.headers;
      resetInput();
      setIsModalOpen(false);
      const token = userToken['authorization'].slice(7);
      cookie.set('accessToken', token);
      if (token) {
        const userInfo = await getUserInfo();
        login(userInfo);
      }
    } catch (error) {
      console.error('로그인 오류:', error);
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

  return (
    <Modal size="auth">
      {/* <span
        style={{ textAlign: 'right', margin: '-50px' }}
        onClick={() => setIsModalOpen(false)}
      >
        X
      </span> */}

      <div style={{ padding: '20px' }}>
        <div
          style={{
            width: '80px',
            height: '40px',
            border: '1px solid black',
            margin: '0 auto',
            boxSizing: 'border-box',
          }}
        >
          logo
        </div>
        <p style={{ textAlign: 'center', fontWeight: '900', fontSize: '20px' }}>
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
          <StyledLabel style={{ fontWeight: '800', fontSize: '15px' }}>
            이메일
          </StyledLabel>
          <AuthInput
            type="text"
            name="email"
            value={email}
            onChange={onInputChange}
            placeholder="이메일"
            style={{ width: '238px' }}
          />
        </AuthDiv>
        <AuthDiv>
          <StyledLabel style={{ fontWeight: '800', fontSize: '15px' }}>
            비밀번호
          </StyledLabel>
          <AuthInput
            type="password"
            name="password"
            value={password}
            onChange={onInputChange}
            placeholder="비밀번호"
            style={{ width: '238px', marginBottom: '30px' }}
          />
        </AuthDiv>
        <Button color="blue" onClick={handleSubmit}>
          로그인
        </Button>
        <img
          src="/assets/images/kakaoLoginImg.png"
          style={{
            cursor: 'pointer',
            width: '260px',
            height: '35px',
            objectFit: 'cover',
            borderRadius: '5px',
            margin: '10px 0',
          }}
          onClick={handleKakaoLogin}
          alt="kakao login"
        />
        <SideDiv
          style={{
            width: '260px',
            height: '13px',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          {/* <span>로그인 유지</span> */}
          <span
            style={{ fontSize: '13px', cursor: 'pointer', color: '#757575' }}
          >
            아이디 / 비밀번호 찾기
          </span>
        </SideDiv>
        <BottomDiv style={{ marginTop: '120px', fontSize: '13px' }}>
          <span>함께 동네를 꾸며볼까요?</span>
          <span
            style={{ marginLeft: '10px', color: '#00a3ff', cursor: 'pointer' }}
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
