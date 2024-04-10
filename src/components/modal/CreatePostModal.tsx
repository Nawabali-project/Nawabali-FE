/* eslint-disable @typescript-eslint/no-explicit-any */
import KaKaoMap from '@/api/kakao/KaKaoMap';
import styled from 'styled-components';
import Modal from './Modal';
import { BackIcon } from '@/utils/icons/icons';
import UploadBox from './UploadBox';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createPost } from '@/api/post';

interface CreatePostProps {
  setIsAddPostModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface CategoryButtonProps {
  isSelected: boolean;
}

interface FormValue {
  file: File[];
  contents: string;
  category: string;
  latitude: number;
  longitude: number;
  district: string;
}

const CreatePostModal: React.FC<CreatePostProps> = (props) => {
  const { register, handleSubmit, setValue, watch } = useForm<FormValue>();
  const [, setImages] = useState<File[]>([]);

  const handleCloseModal = () => {
    props.setIsAddPostModalOpen(false);
  };

  const handleImagesChange = (selectedImages: File[]) => {
    setImages(selectedImages);
    setValue('file', selectedImages);
  };

  const handleLocationChange = (
    latitude: number,
    longitude: number,
    district: string,
  ) => {
    setValue('latitude', latitude);
    setValue('longitude', longitude);
    setValue('district', district);
  };

  const handleCategoryClick = (category: string) => {
    setValue('category', category);
  };

  // 게시글 생성 통신
  const createPostMutation = useMutation({
    mutationFn: createPost,
  });

  // 생성 form 제출
  const onSubmitHandler: SubmitHandler<FormValue> = (data) => {
    const formData = new FormData();

    const requestDto = {
      contents: data.contents,
      category: data.category,
      latitude: data.latitude,
      longitude: data.longitude,
      district: data.district,
    };
    formData.append('requestDto', JSON.stringify(requestDto));

    let files: File[] = [];
    data.file.forEach((file: any) => {
      files.push(file);
    });

    files.forEach((file: File) => {
      formData.append('files', file);
    });

    console.log('폼 데이터 값 출력');
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: `, value);
    }

    createPostMutation.mutate(formData);
  };

  return (
    <Modal>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <BackBox onClick={handleCloseModal}>
          <BackIcon />
        </BackBox>
        <MainLayout>
          <ImageBox>
            <UploadBox onImagesChange={handleImagesChange} />
          </ImageBox>
          <ContentBox>
            <ContentHeader>
              <ProfileBox>
                <ProfileImg />
              </ProfileBox>
              <NickName>{localStorage.getItem('username')}</NickName>
              <SubmitInput type="submit" value="업로드" />
            </ContentHeader>
            <ContentTextArea
              {...register('contents', { required: true, minLength: 1 })}
              cols={10}
              rows={6}
              placeholder="문구를 입력해주세요..."
            />
            <CategoryBox>
              <CategoryButton
                type="button"
                className="firstCategory"
                isSelected={watch('category') === 'FOOD'}
                onClick={() => handleCategoryClick('FOOD')}
              >
                맛집
              </CategoryButton>
              <CategoryButton
                type="button"
                className="secondCategory"
                isSelected={watch('category') === 'CAFE'}
                onClick={() => handleCategoryClick('CAFE')}
              >
                감성카페
              </CategoryButton>
              <CategoryButton
                type="button"
                className="thirdCategory"
                isSelected={watch('category') === 'PHOTOZONE'}
                onClick={() => handleCategoryClick('PHOTOZONE')}
              >
                사진스팟
              </CategoryButton>
            </CategoryBox>
            <KaKaoMap
              width="100%"
              height="250px"
              onLocationChange={handleLocationChange}
            />
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

const NickName = styled.div`
  display: flex;
  align-items: center;
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

const SubmitInput = styled.input`
  width: 100px;
  margin-right: 10px;
  background-color: white;
  border: none;
  font-size: 15px;
  cursor: pointer;
`;

export default CreatePostModal;
