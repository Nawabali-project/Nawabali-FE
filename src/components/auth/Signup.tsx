import { useState, useEffect } from 'react';
import { useInput } from '@/hooks/useInput';
import Modal from '../modal/Modal';
import {
  StyledLabel,
  AuthDiv,
  BottomDiv,
  AuthInput,
  WarnSpan,
  InfoSpan,
  Logo,
  Result,
  OkSpan,
} from '@/components/auth/authStyle';
import Button from '@/components/button/Button';
import { emailCheck, pwCheck, nicknameCheck } from '@/utils/regex';
import { useDebounce } from '@/hooks/useDebounce';
import {
  nicknameDupCheck,
  signUp,
  varifyNumberCheck,
  sendVerificationCode,
} from '@/api/auth';
import { useMutation } from '@tanstack/react-query';
import { Districts } from '../../utils/districts';
import { AxiosError } from 'axios';
import { VarifyCheck } from '@/interfaces/main/auth/auth.interface';
import AlertModal from '../modal/AlertModal';

interface SignupProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setModalType: (modalType: string) => void;
}

const Signup: React.FC<SignupProps> = ({ setIsModalOpen, setModalType }) => {
  const [input, onChange, resetInput] = useInput({
    email: '',
    nickname: '',
    password: '',
    confirmPassword: '',
    city: '서울특별시',
    district: '',
    validateNumber: '',
  });
  const [emailValidityMessage, setEmailValidityMessage] = useState('');
  const [pwValidityMessage, setPwValidityMessage] = useState('');
  const [pwConfirmMessage, setPwConfirmMessage] = useState('');
  const [nicknameValidityMessage, setNicknameValidityMessage] = useState('');
  const [validNumberValidityMessage, setValidNumberValidityMessage] =
    useState('');
  const [emailOkMessage, setEmailOkMessage] = useState('');
  const [pwConfirmOkMessage, setPwConfirmOkMessage] = useState('');
  const [nicknameOkMessage, setNicknameOkMessage] = useState('');
  const [validNumberOkMessage, setValidNumberOkMessage] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [isVerificationCodeSent, setIsVerificationCodeSent] = useState(false);

  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<React.ReactNode>('');
  const [alertType, setAlertType] = useState('');

  const debouncedEmail = useDebounce(input.email, 500);
  const debouncedPassword = useDebounce(input.password, 500);
  const debouncedConfirmPassword = useDebounce(input.confirmPassword, 500);
  const debouncedNickname = useDebounce(input.nickname, 500);
  const debouncedDistrict = useDebounce(input.district, 500);

  // 추가 사항 0426
  const handleKakaoLogin = async () => {
    const REDIRECT_URI = `${import.meta.env.VITE_KAKAO_REDIRECT_URI}`;
    const CLIENT_ID = `${import.meta.env.VITE_KAKAO_RESTAPI_KEY}`;
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    location.replace(`${KAKAO_AUTH_URL}`);
  };

  // 이메일 유효성 검사
  useEffect(() => {
    if (debouncedEmail.length > 0) {
      setEmailValidityMessage(
        emailCheck(debouncedEmail) ? '' : '제대로 된 이메일을 입력해주세요',
      );
    } else {
      setEmailValidityMessage('');
    }
  }, [debouncedEmail]);

  // 이메일 인증번호 전송
  const sendVerificationMutation = useMutation<unknown, AxiosError, string>({
    mutationKey: ['sendVerificationCode'],
    mutationFn: (email: string) => sendVerificationCode(email),
    onSuccess: () => {
      setEmailOkMessage('인증 메일이 발송되었어요.');
    },
    onError: (error: AxiosError) => {
      console.error('Error:', error.message);
    },
  });

  const handleSendVerificationCodeClick = () => {
    sendVerificationMutation.mutate(input.email);
    setIsVerificationCodeSent(true);
  };

  useEffect(() => {
    input.email.trim() === '' ? setIsVerificationCodeSent(false) : null;
  }, [input.email]);

  // 이메일 인증번호 확인
  const checkVerificationMutation = useMutation<
    unknown,
    AxiosError,
    VarifyCheck
  >({
    mutationKey: ['checkVerificationCode'],
    mutationFn: (varifyData) => varifyNumberCheck(varifyData),
    onSuccess: (result) => {
      if (result !== true) {
        setValidNumberValidityMessage('인증번호가 일치하지 않아요.');
        setValidNumberOkMessage('');
      } else {
        setValidNumberValidityMessage('');
        setValidNumberOkMessage('인증번호가 일치해요.');
      }
    },
    onError: (error: AxiosError) => {
      console.error('Error:', error.message);
    },
  });
  const handleCheckVerificationCodeClick = () => {
    const varifyData = {
      email: input.email,
      code: input.validateNumber,
    };
    checkVerificationMutation.mutate(varifyData);
  };

  // 비밀번호 유효성 검사
  useEffect(() => {
    if (debouncedPassword.length > 0) {
      setPwValidityMessage(
        pwCheck(input.password)
          ? ''
          : '비밀번호는 영문, 숫자, 특수문자 포함 8~15자 입니다.',
      );
    } else {
      setPwValidityMessage('');
    }
  }, [debouncedPassword]);

  useEffect(() => {
    if (debouncedConfirmPassword.length > 0) {
      if (input.confirmPassword === input.password) {
        setPwConfirmOkMessage('비밀번호가 일치해요.');
        setPwConfirmMessage('');
      } else {
        setPwConfirmOkMessage('');
        setPwConfirmMessage('비밀번호가 일치하지 않습니다.');
      }
    } else {
      setPwConfirmOkMessage('');
      setPwConfirmMessage('');
    }
  }, [debouncedConfirmPassword, input.confirmPassword, input.password]);

  useEffect(() => {
    const checkNickname = async () => {
      if (debouncedNickname.length > 0) {
        if (input.nickname.length > 10 || input.nickname.length < 3) {
          setNicknameValidityMessage('닉네임은 3자~10자 입니다.');
          return;
        }

        // 닉네임 중복 검사
        try {
          const response = await nicknameDupCheck(input.nickname);
          if (response.data) {
            setNicknameValidityMessage('');
            setNicknameOkMessage('멋진 닉네임이네요:)');
          } else {
            setNicknameValidityMessage('이미 사용중인 닉네임입니다.');
            setNicknameOkMessage('');
          }
        } catch (error) {
          console.error('닉네임 중복 검사 중 에러 발생:', error);
          setNicknameValidityMessage('');
        }
      } else {
        setNicknameValidityMessage('');
      }
    };
    checkNickname();
  }, [debouncedNickname]);

  // 지역 검색
  useEffect(() => {
    if (debouncedDistrict.trim() !== '' && !selectedDistrict) {
      const filteredResults = Districts.filter((district) =>
        district.includes(debouncedDistrict),
      );
      setResults(filteredResults);
    } else {
      setResults([]);
    }
  }, [debouncedDistrict, selectedDistrict]);

  const handleResultClick = (selectedDistrict: string) => {
    onChange({ target: { name: 'district', value: selectedDistrict } });
    setSelectedDistrict(selectedDistrict);
    setResults([]);
  };

  const handleSearchDistrictChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newValue = e.target.value;
    onChange({ target: { name: 'district', value: newValue } });
    if (selectedDistrict && newValue !== selectedDistrict) {
      setSelectedDistrict('');
    }
  };

  const isFormValid =
    input.email.length > 0 &&
    emailCheck(input.email) &&
    input.nickname.length > 0 &&
    nicknameCheck(input.nickname) &&
    input.password.length > 0 &&
    pwCheck(input.password) &&
    input.confirmPassword === input.password &&
    input.district.trim().length > 0 &&
    validNumberOkMessage === '인증번호가 일치해요.';

  const showAlertModal = (message: React.ReactNode) => {
    setAlertMessage(message);
    setIsAlertModalOpen(true);
  };

  // 회원가입 처리
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) {
      showAlertModal('입력값을 확인해주세요.');
    } else {
      try {
        await signUp({
          email: input.email,
          nickname: input.nickname,
          password: input.password,
          confirmPassword: input.confirmPassword,
          city: '서울특별시',
          district: input.district.split(' ')[1],
        });
        resetInput();
        setIsModalOpen(false);
        setAlertType('complete');
        showAlertModal('회원가입이 완료되었어요!');
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error('회원가입 오류:', error.message);
          alert(
            '회원가입 실패: ' + (error.response?.data.message || error.message),
          );
        } else {
          console.error('Unexpected error:', error);
          alert('회원가입 실패: 알 수 없는 오류가 발생했습니다.');
        }
      }
    }
  };

  const showSearchResults =
    input.district && !selectedDistrict && results.length > 0;

  return (
    <>
      {' '}
      <Modal
        isAlertModalOpen={false}
        size="auth"
        onClose={() => setIsModalOpen(false)}
      >
        <form onSubmit={handleSubmit}>
          <Logo />

          <p
            style={{ textAlign: 'center', fontWeight: '600', fontSize: '20px' }}
          >
            회원가입
          </p>
          <div
            style={{
              width: '300px',
              margin: '0 auto 10px',
              border: '1px solid #F1F1F1',
            }}
          />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <StyledLabel>이메일</StyledLabel>
            <WarnSpan>{emailValidityMessage}</WarnSpan>
            <OkSpan>{emailOkMessage}</OkSpan>
          </div>
          <div style={{ display: 'flex' }}>
            <AuthInput
              type="text"
              name="email"
              value={input.email}
              onChange={onChange}
              placeholder="이메일"
            />
            <Button
              disabled={input.email.length <= 0}
              size="check"
              color="blue"
              type="button"
              onClick={handleSendVerificationCodeClick}
            >
              인증
            </Button>
          </div>
          {isVerificationCodeSent && (
            <>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <StyledLabel>인증번호 입력</StyledLabel>
                <WarnSpan>{validNumberValidityMessage}</WarnSpan>
                <OkSpan>{validNumberOkMessage}</OkSpan>
              </div>
              <div style={{ display: 'flex' }}>
                <AuthInput
                  type="text"
                  name="validateNumber"
                  value={input.validateNumber}
                  onChange={onChange}
                  placeholder="인증번호를 입력해주세요."
                />
                <Button
                  disabled={input.validateNumber.length != 6}
                  size="check"
                  color="blue"
                  type="button"
                  onClick={handleCheckVerificationCodeClick}
                >
                  확인
                </Button>
              </div>
            </>
          )}

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <StyledLabel>비밀번호</StyledLabel>
            <WarnSpan>{pwValidityMessage}</WarnSpan>
          </div>
          <AuthDiv>
            <InfoSpan>
              영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.
            </InfoSpan>
          </AuthDiv>
          <AuthInput
            type="password"
            name="password"
            value={input.password}
            onChange={onChange}
            placeholder="비밀번호"
            style={{ width: '318px' }}
          />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <StyledLabel>비밀번호 확인</StyledLabel>
            <WarnSpan>{pwConfirmMessage}</WarnSpan>
            <OkSpan>{pwConfirmOkMessage}</OkSpan>
          </div>
          <AuthInput
            type="password"
            name="confirmPassword"
            value={input.confirmPassword}
            onChange={onChange}
            placeholder="비밀번호확인"
            style={{ width: '318px' }}
          />

          <AuthDiv>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <StyledLabel>닉네임</StyledLabel>
              <WarnSpan>{nicknameValidityMessage}</WarnSpan>
              <OkSpan>{nicknameOkMessage}</OkSpan>
            </div>
          </AuthDiv>
          <AuthInput
            type="text"
            name="nickname"
            value={input.nickname}
            onChange={onChange}
            placeholder="닉네임"
            style={{ width: '318px' }}
          />
          <AuthDiv>
            <StyledLabel>사는 곳</StyledLabel>
            <AuthInput
              name="district"
              value={input.district}
              onChange={handleSearchDistrictChange}
              placeholder="ㅇㅇ구로 검색하세요"
              style={{ width: '318px' }}
            />
            {showSearchResults && (
              <div>
                {results.map((result, index) => (
                  <Result key={index} onClick={() => handleResultClick(result)}>
                    - {result}
                  </Result>
                ))}
              </div>
            )}
          </AuthDiv>
          <div style={{ margin: ' 15px 0 5px' }}>
            <Button
              type="submit"
              size="default"
              color="blue"
              disabled={!isFormValid}
            >
              회원가입하기
            </Button>
          </div>
          <Button
            type="button"
            size="default"
            color="yellow"
            onClick={handleKakaoLogin}
          >
            카카오로 3초만에 시작하기
          </Button>
        </form>
        <BottomDiv style={{ marginTop: '70px' }}>
          <InfoSpan style={{ fontSize: '12px' }}>
            이미 계정이 있으신가요?
          </InfoSpan>
          <InfoSpan
            style={{
              marginLeft: '10px',
              fontWeight: '700',
              fontSize: '13px',
              color: '#00a3ff',
              cursor: 'pointer',
              textDecoration: 'underLine',
            }}
            onClick={() => setModalType('login')}
          >
            로그인하기
          </InfoSpan>
        </BottomDiv>
      </Modal>
      {isAlertModalOpen && (
        <AlertModal
          message={alertMessage}
          closeAlert={() => setIsAlertModalOpen(false)}
          alertType={alertType}
        />
      )}
    </>
  );
};

export default Signup;
