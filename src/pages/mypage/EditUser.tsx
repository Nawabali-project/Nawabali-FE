import styled from 'styled-components';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { IoIosArrowForward, IoIosSearch } from 'react-icons/io';
import SideBar from './SideBar';
import Button from '@/components/button/Button';
import { checkPassWord, editUserInfo, useUserInfo } from '@/api/user';
import { useInput } from '@/hooks/useInput';
import { useDebounce } from '@/hooks/useDebounce';
import { Districts } from '../../utils/districts';
import { pwCheck, nicknameCheck } from '@/utils/regex/regex';
import { AuthInput, WarnSpan } from '../auth/authStyle';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const profileImg = '/assets/images/basicImg.png';

const EditUser: React.FC = () => {
  const { data } = useUserInfo();

  const [input, onChange, resetInput] = useInput({
    prevPassword: '',
    writtenPassword: '',
    writtenConfirmPassword: '',
    writtenNickname: '',
    district: data?.district || '',
  });

  const [results, setResults] = useState<string[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const debouncedDistrict = useDebounce(input.district, 500);
  const [prevPwValidityMessage, setPrevPwValidityMessage] =
    useState<string>('');
  const [pwValidityMessage, setPwValidityMessage] = useState<string>('');
  const [pwConfirmMessage, setPwConfirmMessage] = useState<string>('');
  const [nicknameValidityMessage, setNicknameValidityMessage] =
    useState<string>('');

  const [showNicknameInput, setShowNicknameInput] = useState(false);
  const [showEditPwInput, setShowEditPwInput] = useState(false);

  const debouncedPrevPassword = useDebounce(input.PrevPassword, 800);
  const debouncedWrittenPassword = useDebounce(input.writtenPassword, 500);
  const debouncedWrittenConfirmPassword = useDebounce(
    input.writtenConfirmPassword,
    500,
  );

  // 비밀번호 수정
  const handleChangePwClick = () => {
    setShowEditPwInput(true);
  };

  const prevPwMutation = useMutation({
    mutationFn: () => checkPassWord(input.prevPassword),
    onSuccess: (data) => {
      if (data) {
        setPrevPwValidityMessage('');
      } else {
        setPrevPwValidityMessage('기존 비밀번호와 일치하지 않습니다.');
      }
    },
    onError: (error: AxiosError) => {
      console.error('Error:', error.message);
    },
  });

  useEffect(() => {
    if (debouncedPrevPassword) {
      prevPwMutation.mutate();
    }
  }, [debouncedPrevPassword, prevPwMutation]);

  // 비밀번호 유효성 검사
  useEffect(() => {
    if (input.writtenPassword) {
      setPwValidityMessage(
        pwCheck(input.writtenPassword)
          ? ''
          : '비밀번호는 영문, 숫자, 특수문자 포함 8~15자 입니다.',
      );
    } else if (input.prevPassword === input.writtenPassword) {
      setPwValidityMessage('이전 비밀번호는 사용할 수 없습니다.');
    } else {
      setPwValidityMessage('');
    }
  }, [debouncedWrittenPassword]);

  useEffect(() => {
    if (input.writtenConfirmPassword) {
      setPwConfirmMessage(
        debouncedWrittenConfirmPassword === input.writtenPassword
          ? ''
          : '비밀번호가 일치하지 않습니다.',
      );
    }
  }, [debouncedWrittenConfirmPassword]);

  //닉네임수정
  const handleChangeNicknameClick = () => {
    setShowNicknameInput(true);
  };

  // 닉네임 유효성 검사
  useEffect(() => {
    if (input.writtenNickname) {
      setNicknameValidityMessage(
        nicknameCheck(input.writtenNickname)
          ? ''
          : '닉네임은 특수문자 제외 3자~10자 입니다.',
      );
    } else {
      setNicknameValidityMessage('');
    }
  }, [input.writtenNickname]);

  // 지역 검색 결과 업데이트
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await editUserInfo({
        nickname: input.writtenNickname,
        password: input.writtenPassword,
        confirmPassword: input.writtenConfirmPassword,
        city: '서울특별시',
        district: input.district,
      });
      resetInput();
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  const showSearchResults =
    input.district && !input.selectedDistrict && results.length > 0;

  return (
    <Container>
      <SideBar />
      <form onSubmit={handleSubmit}>
        <Col style={{ width: '700px' }}>
          <Col style={{ width: '500px', margin: '0 auto' }}>
            <Row>
              <Profile />
              <Col>
                <Col>
                  <TitleSpan>아이디</TitleSpan>
                  <span>{data?.email}</span>
                </Col>
                <Col>
                  <TitleSpan>비밀번호</TitleSpan>
                  <Row>
                    <span>********</span>
                    <Button
                      type="button"
                      size="small"
                      color="light"
                      onClick={handleChangePwClick}
                    >
                      비밀번호 변경
                    </Button>
                  </Row>
                  {showEditPwInput && (
                    <Col>
                      <Row>
                        <span>현재 비밀번호</span>
                        <AuthInput
                          type="password"
                          name="prevPassword"
                          value={input.prevPassword}
                          onChange={onChange}
                        />
                      </Row>
                      <WarnSpan>{prevPwValidityMessage}</WarnSpan>
                      <Row>
                        <span>신규 비밀번호</span>
                        <AuthInput
                          type="password"
                          name="writtenPassword"
                          value={input.writtenPassword}
                          onChange={onChange}
                        />
                      </Row>
                      <WarnSpan>{pwValidityMessage}</WarnSpan>
                      <Row>
                        <span>비밀번호 확인</span>
                        <AuthInput
                          type="password"
                          name="writtenConfirmPassword"
                          value={input.writtenConfirmPassword}
                          onChange={onChange}
                        />
                      </Row>
                      <WarnSpan>{pwConfirmMessage}</WarnSpan>
                    </Col>
                  )}
                </Col>
                <Col>
                  <TitleSpan>닉네임</TitleSpan>
                  <Row>
                    <span>{data?.nickname}</span>
                    <Button
                      type="button"
                      size="small"
                      color="light"
                      onClick={handleChangeNicknameClick}
                    >
                      닉네임 변경
                    </Button>
                    {showNicknameInput && (
                      <>
                        <AuthInput
                          type="text"
                          name="writtenNickname"
                          value={input.writtenNickname}
                          onChange={onChange}
                        />
                        <WarnSpan>{nicknameValidityMessage}</WarnSpan>
                      </>
                    )}
                  </Row>
                </Col>
              </Col>
            </Row>
            <div>
              <Col>
                <TitleSpan>동네 설정</TitleSpan>
                <Row>
                  <FaMapMarkerAlt />
                  <span>서울특별시 {data?.district}</span>
                </Row>
              </Col>
              <Col>
                <SearchDiv>
                  <IoIosSearch style={{ color: 'gray' }} />
                  <AuthInput
                    value={input.district}
                    type="text"
                    placeholder="지역구 검색 또는 아래에서 선택해주세요."
                    onChange={handleSearchDistrictChange}
                  />
                </SearchDiv>
                {showSearchResults && (
                  <div>
                    {results.map((result, index) => (
                      <div
                        key={index}
                        onClick={() => handleResultClick(result)}
                      >
                        {result}
                      </div>
                    ))}
                  </div>
                )}
              </Col>
            </div>
            <div>
              <span>
                회원 탈퇴하기
                <IoIosArrowForward />
              </span>
              <Button type="submit" size="large" color="dark">
                수정완료
              </Button>
            </div>
          </Col>
        </Col>
      </form>
    </Container>
  );
};

export default EditUser;

const Container = styled.div`
  width: 1000px;
  margin: 100px auto 0;
  justify-content: center;
  display: flex;
  border: 1px solid pink;
`;

const Row = styled.div`
  display: flex;
  border: 1px solid blue;
  border-radius: 10px;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  border: 1px solid red;
`;

const Profile = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-size: cover;
  cursor: pointer;
  margin: 0 8px;
  background-image: url(${profileImg});
`;

const TitleSpan = styled.span`
  font-weight: 600;
  font-size: 15px;
  margin-right: 10px;
`;

const SearchDiv = styled.div`
  border: 1px solid gray;
  border-radius: 15px;
  height: 30px;
  width: 90%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 10px;

  input {
    width: 90%;
    border: none;
    font-size: 13px;
    &:focus {
      outline: none;
    }
  }
`;
