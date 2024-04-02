import Header from '../common/header/Header';
import styled from 'styled-components';
import CreatePostModal from '@/common/modal/CreatePostModal';
import { useState } from 'react';

const Main = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <Header />
      <Button onClick={() => setIsModalOpen(true)}>글쓰기</Button>
      {isModalOpen && <CreatePostModal setIsModalOpen={setIsModalOpen} />}
    </>
  );
};

const Button = styled.button`
  margin-top: 100px;
`;

export default Main;
