/* eslint-disable @typescript-eslint/no-explicit-any */
import KaKaoMap from '@/common/kakao/KaKaoMap';
import styled from 'styled-components';
import { useState } from 'react';
import Modal from './Modal';

interface CreatePostProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreatePostModal: React.FC<CreatePostProps> = ({ setIsModalOpen }) => {
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [imageSrc, setImageSrc]: string = useState('');

  const onUpload = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    return new Promise<void>((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result || null);
        resolve();
      };
    });
  };

  return (
    <Modal>
      <CreatePostForm>
        <HeaderLayout>
          <div onClick={handleCloseModal}>X</div>
          <SubmitButton>업로드</SubmitButton>
        </HeaderLayout>
        <MainLayout>
          <ImageCategory>
            <ImageBox>
              <input
                accept="image/*"
                multiple
                type="file"
                onChange={(e) => onUpload(e)}
                placeholder="사진"
              />
              <img src={imageSrc} width={'100%'} height={'100%'} />
            </ImageBox>
            <div>
              <CategoryButton type="button" className="firstCategory">
                맛집
              </CategoryButton>
              <CategoryButton type="button" className="secondCategory">
                감성카페
              </CategoryButton>
              <CategoryButton type="button" className="thirdCategory">
                사진스팟
              </CategoryButton>
            </div>
          </ImageCategory>

          <ContentBox>
            <TitleInput type="text" placeholder="제목을 입력해주세요" />
            <ContentTextArea
              name=""
              id=""
              cols={10}
              rows={3}
              placeholder="문구를 입력해주세요"
            />

            <KaKaoMap width="100%" height="300px" />
          </ContentBox>
        </MainLayout>
      </CreatePostForm>
    </Modal>
  );
};

const CreatePostForm = styled.form``;

const HeaderLayout = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MainLayout = styled.div`
  display: flex;
  justify-content: center;
`;

const ImageCategory = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 550px;
`;

const ImageBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 500px;
`;

const ContentBox = styled.div`
  width: 350px;
  height: 550px;
`;

const CategoryButton = styled.button`
  background-color: white;
  border-radius: 10px;
  padding: 5px 10px;
  margin: 10px 10px 10px 0px;
  cursor: pointer;

  &.firstCategory {
    border: 3px solid #68dc33a6;
  }
  &.secondCategory {
    border: 3px solid #fce6a6;
  }
  &.thirdCategory {
    border: 3px solid #ffbcbc;
  }
`;

const TitleInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  margin: 10px 0px 10px 0px;
  padding: 10px 16px;
  border: 1px solid;
  border-radius: 10px;
  font-size: 15px;

  &:focus {
    box-shadow: 0 0 0 4px rgba(187, 147, 255, 0.5);
    outline: 0;
  }
`;

const ContentTextArea = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  margin: 10px 0px 10px 0px;
  padding: 12px 16px;
  border: 1px solid;
  border-radius: 10px;
  font-size: 15px;
  resize: none;

  &:focus {
    box-shadow: 0 0 0 4px rgba(187, 147, 255, 0.5);
    outline: 0;
  }
`;

const SubmitButton = styled.button`
  box-sizing: border-box;
  background-color: white;
  border: none;
  font-size: 15px;
  cursor: pointer;
`;

export default CreatePostModal;
