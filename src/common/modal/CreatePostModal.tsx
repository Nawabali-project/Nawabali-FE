/* eslint-disable @typescript-eslint/no-explicit-any */
import KaKaoMap from '@/common/kakao/KaKaoMap';
import styled from 'styled-components';
import Modal from './Modal';
import { BackIcon } from '@/utils/regex/icons/icons';
import UploadBox from './UploadBox';
import { useState } from 'react';

interface CreatePostProps {
  setIsAddPostModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface CategoryButtonProps {
  isSelected: boolean;
}

const CreatePostModal: React.FC<CreatePostProps> = ({
  setIsAddPostModalOpen,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCloseModal = () => {
    setIsAddPostModalOpen(false);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsAddPostModalOpen(false);
  };

  return (
    <Modal>
      <form onSubmit={handleSubmit}>
        <BackBox onClick={handleCloseModal}>
          <BackIcon />
        </BackBox>
        <MainLayout>
          <ImageBox>
            <UploadBox />
          </ImageBox>
          <ContentBox>
            <ContentHeader>
              <ProfileBox>
                <ProfileImg />
              </ProfileBox>
              <TitleInput type="text" placeholder="제목을 입력해주세요" />
              <SubmitButton>업로드</SubmitButton>
            </ContentHeader>
            <ContentTextArea
              name=""
              id=""
              cols={10}
              rows={6}
              placeholder="문구를 입력해주세요..."
            />
            <CategoryBox>
              <CategoryButton
                type="button"
                className="firstCategory"
                isSelected={selectedCategory === '맛집'}
                onClick={() => handleCategoryClick('맛집')}
              >
                맛집
              </CategoryButton>
              <CategoryButton
                type="button"
                className="secondCategory"
                isSelected={selectedCategory === '감성카페'}
                onClick={() => handleCategoryClick('감성카페')}
              >
                감성카페
              </CategoryButton>
              <CategoryButton
                type="button"
                className="thirdCategory"
                isSelected={selectedCategory === '사진스팟'}
                onClick={() => handleCategoryClick('사진스팟')}
              >
                사진스팟
              </CategoryButton>
            </CategoryBox>
            <KaKaoMap width="100%" height="250px" />
          </ContentBox>
        </MainLayout>
      </form>
    </Modal>
  );
};

const BackBox = styled.div`
  position: absolute;
  left: 15px;
  top: 15px;
  padding: 5px 6px 3px 7px;
  border-radius: 100px;
  z-index: 1;
  cursor: pointer;
`;

const MainLayout = styled.div`
  display: flex;
  justify-content: center;
`;

const ImageBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 600px;

  .file {
    display: none;
  }

  .preview {
    width: 500px;
    height: 600px;
    margin: auto;
    background-color: #f1f1f1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .preview.active {
    background-color: #efeef3;
    border-color: #111;
  }

  .preview_info {
    width: 100%;
    list-style: none;
    padding: 0;
    gap: 16px;
    display: flex;
    flex-direction: column;
  }

  .preview_info .info_key {
    display: block;
    font-weight: 500;
    font-size: 12px;
    margin-bottom: 4px;
  }

  .preview_info .info_value {
    font-size: 14px;
  }

  .preview_msg {
    font-weight: 500;
    font-size: 18px;
    margin: 20px 0 10px;
    font-weight: bold;
    color: gray;
  }

  .preview_desc {
    margin: 0;
    font-size: 12px;
    color: gray;
  }
`;

const ContentBox = styled.div`
  width: 480px;
  height: 600px;
`;

const ContentHeader = styled.div`
  display: flex;
  margin-top: 15px;
`;

const ProfileBox = styled.div`
  width: 50px;
  padding: 10px;
  border: none;
  border-radius: 100px;
`;

const ProfileImg = styled.div`
  width: 13px;
  height: 13px;
  background-color: #f1f1f1;
  padding: 20px;
  border: none;
  border-radius: 100px;
`;

const CategoryBox = styled.div`
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #f1f1f1;
`;

const CategoryButton = styled.button<CategoryButtonProps>`
  background-color: ${(props) => (props.isSelected ? '#dfdfdf' : 'white')};
  border: 2px solid #dfdfdf;
  border-radius: 10px;
  padding: 5px 10px;
  margin: 0px 10px 0px 10px;
  cursor: pointer;
`;

const TitleInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  padding: 10px 16px;
  border: none;
  font-size: 15px;
`;

const ContentTextArea = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  padding: 12px 16px;
  border: none;
  font-size: 15px;
  resize: none;
`;

const SubmitButton = styled.button`
  width: 100px;
  margin-right: 10px;
  background-color: white;
  border: none;
  font-size: 15px;
  cursor: pointer;
`;

export default CreatePostModal;
