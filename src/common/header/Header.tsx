import styled from 'styled-components';
import Login from '@/pages/auth/Login';
import Signup from '@/pages/auth/Signup';
import { useState } from 'react';

const Header: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(true);

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
        <div>logo</div>
        <Items>
          <input type="text" placeholder="사진스팟을 검색해 보세요" />
          <button onClick={handleLogin}>로그인</button>
          <button onClick={handleSignup}>회원가입</button>
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

const HeaderLayout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100%;
  padding: 10px 0px 10px 50px;
  background-color: gray;
`;

const Items = styled.div`
  display: flex;
  margin-right: 100px;
`;

export default Header;
