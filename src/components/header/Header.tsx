import styled from 'styled-components';
import Login from '@/components/auth/Login';
import Signup from '@/components/auth/Signup';
import { useEffect, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { FaRegEdit } from 'react-icons/fa';
import { HiOutlineChatBubbleLeftRight } from 'react-icons/hi2';
import SearchBar from '../modal/SearchBarModal';
import { useDebounce } from '@/hooks/useDebounce';
import CreatePostModal from '../modal/CreatePostModal';
import BalloonModal from '../modal/BalloonModal';
import useAuthStore from '@/store/AuthState';

import DetailPostModal from '../modal/DetailPostModal';
import { useNavigate } from 'react-router-dom';
import { LogoIcon } from '@/utils/icons';
import useSSEStore from '@/store/SSEState';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isMyInfoModalOpen, setIsMyInfoModalOpen] = useState(false);
  const [isSearchbarOpen, setSearchbarOpen] = useState<boolean>(false);
  const [isAddPostModalOpen, setIsAddPostModalOpen] = useState<boolean>(false);
  const [isSearchFocused, setSearchFocused] = useState<boolean>(false);

  const useIsLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<number>(0);

  const debouncedContent = useDebounce(content, 10);

  const notificationCount = useSSEStore((state) => state.notificationCount);

  useEffect(() => {
    setSearchbarOpen(!!debouncedContent.trim());
  }, [debouncedContent]);

  const handleLogin = () => {
    setModalType('login');
    setIsModalOpen(true);
  };

  const handleSignup = () => {
    setModalType('signup');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalType('');
  };

  const handleOpenInfoModal = () => {
    setIsMyInfoModalOpen(true);
  };

  const handleCloseInfoModal = () => {
    setIsMyInfoModalOpen(false);
  };

  const handleSearchFocus = () => {
    setSearchFocused(true);
  };
  const handleSearchBlur = () => {
    setSearchFocused(false);
    setContent('');
  };

  const handleOpenDetailModal = (postId: number) => {
    setSelectedPostId(postId);
    setIsDetailModalOpen(true);
  };

  const handleSearchSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && content.trim()) {
      navigate(`/search/${content.trim()}`);
      setContent('');
    }
  };

  return (
    <>
      <HeaderLayout>
        <SecondHeader>
          <LogoBox
            onClick={() => {
              navigate('/');
            }}
          >
            <LogoIcon />
          </LogoBox>

          <Items>
            <SearchDiv style={{ position: 'relative' }}>
              <IoIosSearch style={{ color: 'gray' }} />
              <input
                value={content}
                type="text"
                placeholder="게시물 내용으로 검색할 수 있어요!"
                onChange={(e) => setContent(e.target.value)}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                onKeyDown={handleSearchSubmit}
              />
              {isSearchFocused && (
                <SearchBar
                  content={content}
                  $isOpen={isSearchbarOpen}
                  onPostSelect={handleOpenDetailModal}
                />
              )}
            </SearchDiv>

            {!useIsLoggedIn ? (
              <Items style={{ width: '130px' }}>
                <HeaderSpan onClick={handleLogin}>로그인</HeaderSpan>
                <div
                  style={{ width: '1px', height: '15px', background: 'gray' }}
                />
                <HeaderSpan onClick={handleSignup}>회원가입</HeaderSpan>
              </Items>
            ) : (
              <>
                <Items style={{ width: '110px' }}>
                  <HiOutlineChatBubbleLeftRight
                    style={{
                      fontSize: '25px',
                      color: 'gray',
                      margin: '8px',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      alert('앗, 채팅은 아직 구현중입니다 :)');
                      // navigate('/chat');
                    }}
                  />
                  {notificationCount !== 0 && (
                    <NotiCount
                      onClick={() => {
                        navigate('/chat');
                      }}
                    >
                      {notificationCount}
                    </NotiCount>
                  )}
                  <ProfileContainer>
                    <Profile
                      src={
                        localStorage
                          .getItem('profileImageUrl')
                          ?.split('"')[1] ?? undefined
                      }
                      // src={localStorage.getItem('profileImageUrl') ?? undefined}
                      onClick={handleOpenInfoModal}
                    />
                    {isMyInfoModalOpen && (
                      <BalloonModal
                        isOpen={isMyInfoModalOpen}
                        onClose={handleCloseInfoModal}
                      />
                    )}
                  </ProfileContainer>
                </Items>

                <WriteButton onClick={() => setIsAddPostModalOpen(true)}>
                  <HeaderSpan style={{ margin: '0', color: 'white' }}>
                    글쓰기
                  </HeaderSpan>
                  <FaRegEdit style={{ color: 'white' }} />
                </WriteButton>
              </>
            )}
            {isAddPostModalOpen && (
              <CreatePostModal setIsAddPostModalOpen={setIsAddPostModalOpen} />
            )}
          </Items>
        </SecondHeader>
      </HeaderLayout>
      {isModalOpen && (
        <>
          {modalType === 'login' && (
            <Login
              setIsModalOpen={handleCloseModal}
              setModalType={setModalType}
            />
          )}
          {modalType === 'signup' && (
            <Signup
              setIsModalOpen={handleCloseModal}
              setModalType={setModalType}
            />
          )}
        </>
      )}
      {isDetailModalOpen && (
        <DetailPostModal
          postId={selectedPostId}
          setIsDetailPostModalOpen={setIsDetailModalOpen}
        />
      )}
    </>
  );
};

export default Header;

const SecondHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1280px;
`;

const HeaderLayout = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 60px;
  z-index: 900;
  background-color: white;
  border-bottom: 1px solid #d9d9d9;
  padding: 0px 0px 0px 50px;
`;

const LogoBox = styled.div`
  margin: 20px;
  cursor: pointer;
`;

const Items = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0 5px 0 0px;
  align-items: center;
  position: relative;
`;

const NotiCount = styled.div`
  position: absolute;
  left: 35px;
  top: 5px;
  width: 20px;
  height: 15px;
  border-radius: 30px;
  background-color: red;
  font-size: 13px;
  text-align: center;
  color: white;
  cursor: pointer;
`;

const SearchDiv = styled.div`
  border: 1px solid gray;
  border-radius: 15px;
  height: 30px;
  width: 250px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 10px;

  input {
    width: 250px;
    border: none;
    font-size: 13px;
    &:focus {
      outline: none;
    }
  }
`;

const HeaderSpan = styled.span`
  font-size: 13px;
  color: gray;
  margin: 0 8px;
  cursor: pointer;
`;

const WriteButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 50px;
  border-radius: 5px;
  background-color: #00a3ff;
  margin: 0 9px 0 0;
  padding: 7px 10px;
  cursor: pointer;
`;

const ProfileContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Profile = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #f3f3f3;
  background-size: cover;
  cursor: pointer;
  margin: 0 8px;
  object-fit: cover;
`;
