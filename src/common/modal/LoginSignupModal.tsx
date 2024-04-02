import React from 'react';
import Modal from './Modal';
import KaKaoAddr from '../kakao/KaKaoAddr';

interface LoginSignupProps {
  isLogin: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginSignupModal: React.FC<LoginSignupProps> = (props) => {
  const handleCloseModal = () => {
    props.setIsModalOpen(false);
  };

  return (
    <Modal>
      <button onClick={handleCloseModal}>X</button>
      {props.isLogin ? (
        <>
          <h2>로그인</h2>
          <div>이메일</div>
          <input type="text" placeholder="이메일을 입력하세요" />
          <div>비밀번호</div>
          <input type="password" placeholder="비밀번호를 입력해주세요" />
          <button>로그인</button>
        </>
      ) : (
        <>
          <h2>회원가입</h2>
          <div>이메일</div>
          <input type="text" placeholder="이메일을 입력하세요" />
          <div>비밀번호</div>
          <input type="password" placeholder="비밀번호를 입력해주세요" />
          <div>비밀번호 확인</div>
          <input type="password" placeholder="비밀번호를 다시 입력해주세요" />
          <KaKaoAddr />
          <button>가입하기</button>
        </>
      )}
    </Modal>
  );
};

export default LoginSignupModal;
