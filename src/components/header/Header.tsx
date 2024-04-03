import styled from 'styled-components';
import Login from '@/pages/auth/Login';
import Signup from '@/pages/auth/Signup';
import { useEffect, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { FaRegEdit } from 'react-icons/fa';
import { HiOutlineChatBubbleLeftRight } from 'react-icons/hi2';
import { GoBell } from 'react-icons/go';
import SearchBar from './SearchBar';
import { useDebounce } from '@/hooks/useDebounce';
import CreatePostModal from '../modal/CreatePostModal';
const profileImg = '/assets/images/basicImg.png';

const Header: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [isLoggedin, setIsLoggedin] = useState<boolean>(false);
  const [address, setAddress] = useState<string>('');
  const [isSearchbarOpen, setSearchbarOpen] = useState<boolean>(false);
  const [isAddPostModalOpen, setIsAddPostModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    setIsLoggedin(!!accessToken);
  }, []);

  const debouncedAddress = useDebounce(address, 300);

  useEffect(() => {
    setSearchbarOpen(!!debouncedAddress.trim());
  }, [debouncedAddress]);

  const handleLogin = () => {
    setIsLogin(true);
    setIsModalOpen(true);
  };

  const handleSignup = () => {
    setIsLogin(false);
    setIsModalOpen(true);
  };

  return (
    <>
      <HeaderLayout>
        <Items>
          <SearchDiv style={{ position: 'relative' }}>
            <IoIosSearch style={{ color: 'gray' }} />
            <input
              value={address}
              type="text"
              placeholder="지역명, 상호 등으로 검색할 수 있어요!"
              onChange={(e) => setAddress(e.target.value)}
            />
            <SearchBar address={address} $isOpen={isSearchbarOpen} />
          </SearchDiv>

          {isLoggedin ? (
            <Items style={{ width: '150px' }}>
              <HiOutlineChatBubbleLeftRight
                style={{
                  fontSize: '25px',
                  color: 'gray',
                  margin: '8px',
                  cursor: 'pointer',
                }}
              />
              <GoBell
                style={{
                  fontSize: '25px',
                  color: 'gray',
                  margin: '8px',
                  cursor: 'pointer',
                }}
              />
              <Profile />
            </Items>
          ) : (
            <Items style={{ width: '150px' }}>
              <HeaderSpan onClick={handleLogin}>로그인</HeaderSpan>
              <div
                style={{ width: '1px', height: '15px', background: 'gray' }}
              />
              <HeaderSpan onClick={handleSignup}>회원가입</HeaderSpan>
            </Items>
          )}
          <WriteButton onClick={() => setIsAddPostModalOpen(true)}>
            <HeaderSpan style={{ margin: '0', color: 'white' }}>
              글쓰기
            </HeaderSpan>
            <FaRegEdit style={{ color: 'white' }} />
          </WriteButton>
          {isAddPostModalOpen && (
            <CreatePostModal setIsAddPostModalOpen={setIsAddPostModalOpen} />
          )}
        </Items>
      </HeaderLayout>
      {isModalOpen && (
        <>
          {isLogin ? (
            <Login setIsModalOpen={setIsModalOpen} />
          ) : (
            <Signup setIsModalOpen={setIsModalOpen} />
          )}
        </>
      )}
    </>
  );
};

export default Header;

const HeaderLayout = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 60px;
  z-index: 900;
  background-color: white;
  border-bottom: 1px solid gray;
  padding: 0 100px;
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
    width: 230px;
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
  border-radius: 15px;
  background-color: gray;
  padding: 2px 5px;
  cursor: pointer;
`;

const Profile = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-size: cover;
  cursor: pointer;
  margin: 0 8px;
  background-image: url(${profileImg});
`;
