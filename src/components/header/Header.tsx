import styled from 'styled-components';
import Login from '@/components/auth/Login';
import Signup from '@/components/auth/Signup';
import { useEffect, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { FaRegEdit } from 'react-icons/fa';
import { HiOutlineChatBubbleLeftRight } from 'react-icons/hi2';
import { GoBell } from 'react-icons/go';
import SearchBar from '../modal/SearchBarModal';
import { useDebounce } from '@/hooks/useDebounce';
import CreatePostModal from '../modal/CreatePostModal';
import BalloonModal from '../modal/BalloonModal';
import useAuthStore from '@/store/AuthState';

import DetailPostModal from '../modal/DetailPostModal';
import { useNavigate } from 'react-router-dom';
import { LogoIcon } from '@/utils/icons';

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
  const hasNotifications = useAuthStore((state) => state.hasNotifications);
  const { setHasNotifications } = useAuthStore.getState();
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<number>(0);

  const debouncedContent = useDebounce(content, 1000);

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

  return (
    <>
      <HeaderLayout>
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
              placeholder="제목으로 검색할 수 있어요!"
              onChange={(e) => setContent(e.target.value)}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
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
            <Items style={{ width: '150px' }}>
              <HeaderSpan onClick={handleLogin}>로그인</HeaderSpan>
              <div
                style={{ width: '1px', height: '15px', background: 'gray' }}
              />
              <HeaderSpan onClick={handleSignup}>회원가입</HeaderSpan>
            </Items>
          ) : (
            <>
              <Items style={{ width: '150px' }}>
                <HiOutlineChatBubbleLeftRight
                  style={{
                    fontSize: '25px',
                    color: 'gray',
                    margin: '8px',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    navigate('/chat');
                  }}
                />
                <GoBell
                  style={{
                    fontSize: '25px',
                    color: hasNotifications ? 'red' : 'gray',
                    margin: '8px',
                    cursor: 'pointer',
                  }}
                  onClick={() => setHasNotifications(false)}
                />
                <ProfileContainer>
                  <Profile
                    src={localStorage.getItem('profileImageUrl') ?? undefined}
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
  border-bottom: 1px solid #a1a1a1;
  padding: 0px 0px 0px 50px;
`;

const LogoBox = styled.div`
  cursor: pointer;
`;

const Items = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
  border-radius: 5px;
  background-color: #00a3ff;
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
