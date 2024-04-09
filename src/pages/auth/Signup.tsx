import { useInput } from '@/hooks/useInput';
import Modal from '../../components/modal/Modal';
import {
  StyledLabel,
  AuthDiv,
  BottomDiv,
  AuthInput,
  WarnSpan,
  InfoSpan,
} from '@pages/auth/authStyle';
import Button from '@/components/button/Button';
import { emailCheck, pwCheck, nicknameCheck } from '@/utils/regex/regex';
import { useEffect, useState } from 'react';
import { Districts } from '../../utils/districts';
import { useDebounce } from '@/hooks/useDebounce';
import { useMutation } from '@tanstack/react-query';
import { signUp, verificationTest, verifyNumberCheck } from '@/api/auth/user';

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
    city: '서울시',
    district: '',
  });
  const [emailValidityMessage, setEmailValidityMessage] = useState<string>('');
  const [pwValidityMessage, setPwValidityMessage] = useState<string>('');
  const [pwConfirmMessage, setPwConfirmMessage] = useState<string>('');
  const [nicknameValidityMessage, setNicknameValidityMessage] =
    useState<string>('');
  const [validNumberValidityMessage, setValidNumberValidityMessage] =
    useState<string>('');
  const [searchDistrict, setSearchDistrict] = useState<string>('');
  useState<boolean>(false);
  const [results, setResults] = useState<string[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [writtenEmail, setWrittenEmail] = useState('');
  const [writtenPassword, setWrittenPassword] = useState('');
  const [writtenNickname, setWrittenNickname] = useState('');
  const [validateNumber, setValidateNumber] = useState('');
  const debouncedSearchDistrict = useDebounce(searchDistrict, 500);
  const debouncedEmail = useDebounce(writtenEmail, 500);
  const debouncedPassword = useDebounce(writtenPassword, 500);
  const debouncedNickname = useDebounce(writtenNickname, 500);
  const [writtenConfirmPassword, setWrittenConfirmPassword] = useState('');
  const debouncedConfirmPassword = useDebounce(writtenConfirmPassword, 500);

  // 이메일 입력 변경 핸들러
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWrittenEmail(e.target.value);
  };

  const handleValidateNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValidateNumber(e.target.value);
  };

  // 비밀번호 입력 변경 핸들러
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWrittenPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setWrittenConfirmPassword(e.target.value);
  };

  // 닉네임 입력 변경 핸들러
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWrittenNickname(e.target.value);
  };

  //이메일 유효성 검사
  useEffect(() => {
    if (debouncedEmail) {
      const isValidEmail = emailCheck(debouncedEmail);
      setEmailValidityMessage(
        isValidEmail ? '' : '제대로 된 이메일을 입력해주세요',
      );
    } else {
      setEmailValidityMessage('');
    }
  }, [debouncedEmail]);

  const mutation = useMutation({
    mutationFn: verificationTest,
  });

  const handleValidateButtonClick = () => {
    verifyNumberCheck({
      email: writtenEmail,
      code: validateNumber,
    })
      .then((response) => {
        if (response != true) {
          setValidNumberValidityMessage('인증번호가 일치하지 않아요.');
        } else {
          setValidNumberValidityMessage('');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  // 비밀번호 유효성 검사
  useEffect(() => {
    if (debouncedPassword) {
      const isValidPassword = pwCheck(debouncedPassword);
      setPwValidityMessage(
        isValidPassword
          ? ''
          : '비밀번호는 영문, 숫자, 특수문자 포함 8~15자 입니다.',
      );
    } else {
      setPwValidityMessage('');
    }
  }, [debouncedPassword]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWrittenConfirmPassword(writtenConfirmPassword);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [writtenConfirmPassword]);

  useEffect(() => {
    if (
      debouncedConfirmPassword &&
      debouncedConfirmPassword !== writtenPassword
    ) {
      setPwConfirmMessage('비밀번호가 일치하지 않습니다.');
    } else {
      setPwConfirmMessage('');
    }
  }, [debouncedConfirmPassword, writtenPassword]);

  // 닉네임 유효성 검사
  useEffect(() => {
    if (debouncedNickname) {
      const isValidNickname = nicknameCheck(debouncedNickname);
      setNicknameValidityMessage(
        isValidNickname ? '' : '닉네임은 특수문자 제외 3자~10자 입니다.',
      );
    } else {
      setNicknameValidityMessage('');
    }
  }, [debouncedNickname]);

  useEffect(() => {
    if (debouncedSearchDistrict.trim() !== '' && !selectedDistrict) {
      const filteredResults = Districts.filter((district) =>
        district.includes(debouncedSearchDistrict),
      );
      setResults(filteredResults);
    } else {
      setResults([]);
    }
  }, [debouncedSearchDistrict, selectedDistrict]);

  const handleResultClick = (selectedDistrict: string) => {
    setSearchDistrict(selectedDistrict);
    setSelectedDistrict(selectedDistrict);
    setResults([]);
  };

  const handleSearchDistrictChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newValue = e.target.value;
    setSearchDistrict(newValue);
    if (selectedDistrict && newValue !== selectedDistrict) {
      setSelectedDistrict('');
    }
  };

  const handleSubmit = async () => {
    const user = {
      email: writtenEmail,
      nickname: writtenNickname,
      password: writtenPassword,
      confirmPassword: writtenConfirmPassword,
      city,
      district: selectedDistrict,
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

  const showSearchResults =
    searchDistrict && !selectedDistrict && results.length > 0;

  return (
    <Modal size="auth">
      <span onClick={() => props.setIsModalOpen(false)}>X</span>
      <h1>회원가입</h1>
      <Button size="large" color="normal">
        카카오로 3초만에 시작하기
      </Button>
      <StyledLabel>이메일</StyledLabel>
      <div style={{ display: 'flex' }}>
        <AuthInput
          type="text"
          name="email"
          value={writtenEmail}
          onChange={handleEmailChange}
          placeholder="이메일"
        />
        <button onClick={() => mutation.mutate(writtenEmail)}>인증</button>
      </div>
      <WarnSpan>{emailValidityMessage}</WarnSpan>
      <div style={{ display: 'flex' }}>
        <AuthInput
          type="text"
          name="validateNumber"
          value={validateNumber}
          onChange={handleValidateNumber}
          placeholder="인증번호를 입력해주세요."
        />
        <button onClick={handleValidateButtonClick}>확인</button>
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
        value={writtenPassword}
        onChange={handlePasswordChange}
        placeholder="비밀번호"
      />
      <WarnSpan>{pwValidityMessage}</WarnSpan>
      <StyledLabel>비밀번호 확인</StyledLabel>
      <AuthInput
        type="password"
        name="confirmPassword"
        value={writtenConfirmPassword}
        onChange={handleConfirmPasswordChange}
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
        value={writtenNickname}
        onChange={handleNicknameChange}
        placeholder="닉네임"
      />
      <WarnSpan>{nicknameValidityMessage}</WarnSpan>
      <StyledLabel>사는 곳</StyledLabel>
      <AuthInput
        type="text"
        placeholder="ㅇㅇ구로 검색하세요"
        value={searchDistrict}
        onChange={handleSearchDistrictChange}
      />

      {showSearchResults && (
        <div>
          {results.map((result, index) => (
            <div key={index} onClick={() => handleResultClick(result)}>
              {result}
            </div>
          ))}
        </div>
      )}
      <Button size="large" color="normal" onClick={handleSubmit}>
        회원가입하기
      </Button>
      <BottomDiv>
        <InfoSpan>이미 계정이 있으신가요?</InfoSpan>
        <InfoSpan style={{ fontSize: '0.8rem' }} onClick={handleLoginClick}>
          로그인하기
        </InfoSpan>
      </BottomDiv>
    </Modal>
  );
};

export default Signup;
