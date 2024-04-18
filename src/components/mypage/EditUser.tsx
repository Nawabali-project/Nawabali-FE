import styled from 'styled-components';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { IoIosArrowForward, IoIosSearch } from 'react-icons/io';
import Button from '@/components/button/Button';
import {
  checkPassWord,
  editUserInfo,
  useDeletePhoto,
  useDeleteUser,
  useUpdatePhoto,
  useUserInfo,
} from '@/api/user';
import { useInput } from '@/hooks/useInput';
import { useDebounce } from '@/hooks/useDebounce';
import { Districts } from '../../utils/districts';
import { pwCheck, nicknameCheck } from '@/utils/regex';
import { AuthInput, WarnSpan } from '../auth/authStyle';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ImCamera } from 'react-icons/im';
import DeleteAccountModal from './DeleteAccountModal';

const profileImg = localStorage.getItem('profileImageUrl')?.split('"')[1];
const basicImg = '/assets/images/basicImg.png';

const EditUser: React.FC = () => {
  const { data } = useUserInfo();

  const [input, onChange, resetInput] = useInput({
    prevPassword: '',
    writtenPassword: '',
    writtenConfirmPassword: '',
    writtenNickname: data?.nickname || '',
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
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [imageAction, setImageAction] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { mutate: deletePhotoMutate } = useDeletePhoto();
  const { mutate: updatePhotoMutate } = useUpdatePhoto();
  const { mutate: deleteAccount } = useDeleteUser();

  // 프로필이미지 수정
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setProfileImage(file);
      setImageAction('modify');
      console.log('이미지 수정: ', file);
    }
  };

  const handleEditPhoto = () => {
    const fileInput = document.getElementById('profileImageInput');
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleImageClick = () => {
    setShowModal(true);
  };

  const handleDeletePhoto = () => {
    setProfileImage(null);
    setImageAction('delete');
    setShowModal(false);
  };

  // 비밀번호 수정
  const handleChangePwClick = () => {
    setShowEditPwInput(true);
  };

  const prevPwMutation = useMutation<boolean, AxiosError, void>({
    mutationFn: () => checkPassWord(input.prevPassword),
    onSuccess: (isValid) => {
      if (isValid) {
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
    if (debouncedDistrict.trim() === '' && !selectedDistrict) {
      setResults(Districts);
    } else if (debouncedDistrict.trim() != '' && !selectedDistrict) {
      const filteredResults = Districts.filter((district) =>
        district.toLowerCase().includes(debouncedDistrict.toLowerCase()),
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
      if (profileImage && imageAction === 'modify') {
        updatePhotoMutate(profileImage);
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        currentUser.profileImageUrl =
          URL.createObjectURL(profileImage).slice(5);
        localStorage.setItem('user', JSON.stringify(currentUser));
      } else if (imageAction === 'delete') {
        deletePhotoMutate();
        setProfileImage(null);
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        currentUser.profileImageUrl = '';
        localStorage.setItem('user', JSON.stringify(currentUser));
      }

      await editUserInfo({
        nickname: input.writtenNickname,
        password: input.writtenPassword,
        confirmPassword: input.writtenConfirmPassword,
        city: '서울특별시',
        district: input.district,
      });
      useUserInfo;
      resetInput();
      alert('회원 정보가 성공적으로 업데이트 되었습니다.');
    } catch (error) {
      console.error('Update error:', error);
      alert('회원 정보 업데이트에 실패했습니다.');
    }
  };

  const handleDeleteUser = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirmed = () => {
    deleteAccount();
    setShowDeleteModal(false);
  };

  const showSearchResults = !selectedDistrict && results.length > 0;

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Col style={{ width: '700px', margin: '0 auto' }}>
          <h2>프로필 편집</h2>
          <div
            style={{
              width: '680px',
              height: '1px',
              backgroundColor: '#C1C1C1',
              margin: '10px 0',
            }}
          />
          <Row style={{ padding: '20px' }}>
            <ProfileImageContainer onClick={handleImageClick}>
              <ProfileImage
                src={
                  profileImage
                    ? `${URL.createObjectURL(profileImage).slice(5)}?${new Date().getTime()}`
                    : profileImg || basicImg
                }
                alt="Profile"
              />
              <ProfileImageIcon>
                <ImCamera />
              </ProfileImageIcon>
            </ProfileImageContainer>

            {showModal && (
              <Modal>
                <button onClick={() => setShowModal(false)}>Close</button>
                <span onClick={handleEditPhoto}>수정</span>
                <span onClick={handleDeletePhoto}>삭제</span>
              </Modal>
            )}

            <ProfileImageInput
              type="file"
              id="profileImageInput"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <Col style={{ marginLeft: '50px' }}>
              <Row
                style={{
                  width: '400px',
                  justifyContent: 'space-between',
                  margin: '15px 0',
                }}
              >
                <TitleSpan>이메일</TitleSpan>
                <Row style={{ width: '300px' }}>
                  <span>{data?.email}</span>
                </Row>
              </Row>
              <Row
                style={{
                  width: '400px',
                  justifyContent: 'space-between',
                  margin: '15px 0',
                }}
              >
                <TitleSpan>비밀번호</TitleSpan>
                {!showEditPwInput && (
                  <Row
                    style={{ width: '300px', justifyContent: 'space-between' }}
                  >
                    <span>********</span>
                    <Button
                      type="button"
                      size="small"
                      onClick={handleChangePwClick}
                    >
                      비밀번호 변경
                    </Button>
                  </Row>
                )}
                {showEditPwInput && (
                  <Col>
                    <Col style={{ width: '300px' }}>
                      <Row>
                        <span>현재 비밀번호</span>
                        <WarnSpan>{prevPwValidityMessage}</WarnSpan>
                      </Row>
                      <AuthInput
                        type="password"
                        name="prevPassword"
                        value={input.prevPassword}
                        onChange={onChange}
                      />
                    </Col>

                    <Col style={{ width: '300px' }}>
                      <Row>
                        <span>신규 비밀번호</span>
                        <WarnSpan>{pwValidityMessage}</WarnSpan>
                      </Row>
                      <AuthInput
                        type="password"
                        name="writtenPassword"
                        value={input.writtenPassword}
                        onChange={onChange}
                      />
                    </Col>

                    <Col style={{ width: '300px' }}>
                      <Row>
                        <span>신규 비밀번호 확인</span>
                        <WarnSpan>{pwConfirmMessage}</WarnSpan>
                      </Row>
                      <AuthInput
                        type="password"
                        name="writtenConfirmPassword"
                        value={input.writtenConfirmPassword}
                        onChange={onChange}
                      />
                    </Col>
                  </Col>
                )}
              </Row>
              <Row
                style={{ justifyContent: 'space-between', margin: '15px 0' }}
              >
                <TitleSpan>닉네임</TitleSpan>
                {!showNicknameInput && (
                  <Row
                    style={{
                      width: '290px',
                      justifyContent: 'space-between',
                      paddingRight: '10px',
                    }}
                  >
                    <span>{data?.nickname}</span>
                    <Button
                      type="button"
                      size="small"
                      onClick={handleChangeNicknameClick}
                    >
                      닉네임 변경
                    </Button>
                  </Row>
                )}
                {showNicknameInput && (
                  <>
                    <Row style={{ width: '300px' }}>
                      <AuthInput
                        type="text"
                        name="writtenNickname"
                        value={input.writtenNickname}
                        onChange={onChange}
                      />
                      <WarnSpan>{nicknameValidityMessage}</WarnSpan>
                    </Row>
                  </>
                )}
              </Row>
            </Col>
          </Row>
          <div>
            <Col>
              <h2>동네 설정</h2>
              <Row>
                <FaMapMarkerAlt color="#00a3ff" />
                <span style={{ fontSize: '18px', fontWeight: '600' }}>
                  서울특별시 {data?.district}
                </span>
              </Row>
            </Col>
            <StyledCol>
              <SearchDiv>
                <IoIosSearch style={{ fontSize: '1.5rem', color: 'grey' }} />
                <AuthInput
                  value={input.district}
                  type="text"
                  placeholder="지역구 검색 또는 아래에서 선택해주세요."
                  onChange={handleSearchDistrictChange}
                />
              </SearchDiv>
              {showSearchResults && (
                <ResultDiv>
                  {results.map((result, index) => (
                    <div key={index} onClick={() => handleResultClick(result)}>
                      {result}
                    </div>
                  ))}
                </ResultDiv>
              )}
            </StyledCol>
          </div>
          <div style={{ marginTop: '40px' }}>
            <span
              style={{
                display: 'block',
                fontSize: '11px',
                color: '#424242',
                cursor: 'pointer',
                marginBottom: '10px',
              }}
              onClick={handleDeleteUser}
            >
              회원 탈퇴하기
              <IoIosArrowForward />
            </span>
            <Button type="submit" color="blue">
              수정완료
            </Button>
          </div>
        </Col>
      </form>
      {showDeleteModal && (
        <DeleteAccountModal
          onClose={() => setShowDeleteModal(false)}
          onDeleteConfirmed={handleDeleteConfirmed}
        />
      )}
    </Container>
  );
};

export default EditUser;

const Container = styled.div`
  width: 1000px;
  margin: 100px auto 0;
  justify-content: center;
  display: flex;
  /* border: 1px solid pink; */
`;

const Row = styled.div`
  display: flex;
  /* border: 1px solid blue; */
  border-radius: 10px;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  /* border: 1px solid red; */
`;

const TitleSpan = styled.span`
  font-weight: 600;
  font-size: 15px;
  margin-right: 10px;
`;

const StyledCol = styled(Col)`
  height: 220px;
  background-color: #f9f9f9;
  margin-top: 20px;
`;

const SearchDiv = styled.div`
  border: 1px solid gray;
  border-radius: 20px;
  height: 35px;
  width: 650px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 10px;
  margin: 20px auto 10px;
  background-color: white;

  input {
    width: 90%;
    border: none;
    font-size: 13px;
    &:focus {
      outline: none;
    }
  }
`;

const ResultDiv = styled.div`
  height: 120px;
  overflow: auto;
  padding: 10px 20px;

  &::-webkit-scrollbar {
    width: 8px;
    height: 15px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }

  div {
    margin: 5px 0;
    font-size: 15px;
    color: #424242;
  }
`;

const ProfileImageContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

const ProfileImage = styled.img`
  width: 110px;
  height: 110px;
  border-radius: 50%;
  border: 1px solid #e7e7e7;
`;

const ProfileImageInput = styled.input`
  display: none;
`;

const ProfileImageIcon = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 290px;
  left: 270px;
  width: 40px;
  height: 40px;
  background-color: #3d3d3de6;
  color: white;
  opacity: 50%;
  border-radius: 50%;
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1050;
  background: white;
  padding: 20px;
  border-radius: 10px;
`;
