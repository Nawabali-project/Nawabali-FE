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

interface SignupProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setModalType: (modalType: string) => void;
}

const Signup: React.FC<SignupProps> = (props) => {
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
  const [results, setResults] = useState<string[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');

  const debouncedEmail = useDebounce(input.email, 500);
  const debouncedPassword = useDebounce(input.password, 500);
  const debouncedConfirmPassword = useDebounce(input.confirmPassword, 500);
  const debouncedNickname = useDebounce(input.nickname, 500);
  const debouncedDistrict = useDebounce(input.district, 500);

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
    onError: (error: AxiosError) => {
      console.error('Error:', error.message);
    },
  });

  const handleSendVerificationCodeClick = () => {
    sendVerificationMutation.mutate(input.email);
  };

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
      } else {
        setValidNumberValidityMessage('');
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
      setPwConfirmMessage(
        input.confirmPassword === input.password
          ? ''
          : '비밀번호가 일치하지 않습니다.',
      );
    } else {
      setPwValidityMessage('');
    }
  }, [debouncedConfirmPassword]);

  useEffect(() => {
    const checkNickname = async () => {
      if (debouncedNickname.length > 0) {
        if (!nicknameCheck(input.nickname)) {
          setNicknameValidityMessage('닉네임은 특수문자 제외 3자~10자 입니다.');
          return;
        }

        // 닉네임 중복 검사
        try {
          const response = await nicknameDupCheck(input.nickname);
          if (response.data) {
            setNicknameValidityMessage('');
          } else {
            setNicknameValidityMessage('이미 사용중인 닉네임입니다.');
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

  // 회원가입 처리
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signUp({
        email: input.email,
        nickname: input.nickname,
        password: input.password,
        confirmPassword: input.confirmPassword,
        city: '서울특별시',
        district: input.district,
      });
      resetInput();
      props.setIsModalOpen(false);
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  const showSearchResults =
    input.district && !selectedDistrict && results.length > 0;

  return (
    <Modal size="auth">
      <form onSubmit={handleSubmit}>
        <span onClick={() => props.setIsModalOpen(false)}>X</span>
        <h1>회원가입</h1>
        <Button type="button" size="default" color="blue">
          카카오로 3초만에 시작하기
        </Button>
        <StyledLabel>이메일</StyledLabel>
        <div style={{ display: 'flex' }}>
          <AuthInput
            type="text"
            name="email"
            value={input.email}
            onChange={onChange}
            placeholder="이메일"
          />
          <button type="button" onClick={handleSendVerificationCodeClick}>
            인증
          </button>
        </div>
        <WarnSpan>{emailValidityMessage}</WarnSpan>
        <div style={{ display: 'flex' }}>
          <AuthInput
            type="text"
            name="validateNumber"
            value={input.validateNumber}
            onChange={onChange}
            placeholder="인증번호를 입력해주세요."
          />
          <button type="button" onClick={handleCheckVerificationCodeClick}>
            확인
          </button>
        </div>
        <WarnSpan>{validNumberValidityMessage}</WarnSpan>
        <StyledLabel>비밀번호</StyledLabel>
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
        />
        <WarnSpan>{pwValidityMessage}</WarnSpan>
        <StyledLabel>비밀번호 확인</StyledLabel>
        <AuthInput
          type="password"
          name="confirmPassword"
          value={input.confirmPassword}
          onChange={onChange}
          placeholder="비밀번호확인"
        />
        <WarnSpan>{pwConfirmMessage}</WarnSpan>
        <AuthDiv>
          <StyledLabel>닉네임</StyledLabel>
          <InfoSpan>다른 유저와 겹치지 않도록 입력해주세요. (3~10자)</InfoSpan>
        </AuthDiv>
        <AuthInput
          type="text"
          name="nickname"
          value={input.nickname}
          onChange={onChange}
          placeholder="닉네임"
        />
        <WarnSpan>{nicknameValidityMessage}</WarnSpan>
        <StyledLabel>사는 곳</StyledLabel>
        <AuthInput
          name="district"
          value={input.district}
          onChange={handleSearchDistrictChange}
          placeholder="ㅇㅇ구로 검색하세요"
        />
        {showSearchResults && (
          <div>
            {results.map((result, index) => (
              <div key={index} onClick={() => handleResultClick(result)}>
                서울특별시 {result}
              </div>
            ))}
          </div>
        )}
        <Button type="submit" size="default" color="blue">
          회원가입하기
        </Button>
      </form>
      <BottomDiv>
        <InfoSpan>이미 계정이 있으신가요?</InfoSpan>
        <InfoSpan
          style={{ fontSize: '0.8rem' }}
          onClick={() => props.setModalType('login')}
        >
          로그인하기
        </InfoSpan>
      </BottomDiv>
    </Modal>
  );
};

export default Signup;
