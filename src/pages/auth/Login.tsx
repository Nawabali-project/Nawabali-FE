import Modal from '../../components/modal/Modal';
import { useForm } from 'react-hook-form';
import { login } from '@/api/auth/user';
import {
  StyledLabel,
  AuthInput,
  AuthButton,
  AuthDiv,
  SideDiv,
  BottomDiv,
} from '@pages/auth/authStyle';
import SocialKaKao from '@/api/kakao/SocialKaKao';

interface FormValues {
  email: string;
  password: string;
}

interface LoginProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<LoginProps> = ({ setIsModalOpen }) => {
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await login(data); // 로그인 함수 호출
      // 여기서 성공적인 로그인 처리를 수행하세요.
      console.log('로그인 성공:', response);
    } catch (error) {
      // 로그인 실패 시 오류 처리
      console.error('로그인 오류:', error);
    }
  };

  return (
    <Modal>
      <div style={{ padding: '20px' }}>
        <span onClick={() => setIsModalOpen(false)}>X</span>
        <p>로그인</p>
        <form onSubmit={handleSubmit(onSubmit)}>
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
        <SocialKaKao />
        <SideDiv>
          <span>로그인 유지</span>
          <span>아이디/비밀번호 찾기</span>
        </SideDiv>
        <BottomDiv>
          <span>함께 동네를 꾸며볼까요?</span>
          <span>회원가입하기</span>
        </BottomDiv>
      </div>
    </Modal>
  );
};

export default Login;
