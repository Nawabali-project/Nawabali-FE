/* eslint-disable @typescript-eslint/no-explicit-any */
import KaKaoMap from '@/components/address/KaKaoMap';
import styled from 'styled-components';
import Modal from './Modal';
import UploadBox from '../uploadImg/UploadBox';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
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
  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      handleCloseModal();
      // queryClient.invalidateQueries({ queryKey: ['allPosts'] });
      alert('게시물 추가 성공 :)');
      queryClient.invalidateQueries();
    },
    onError: (error: any) => {
      if (error.response.status === 400) {
        alert('게시물 형식을 모두 작성해주세요 :)');
      }
    },
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
        <MainLayout>
          <ImageBox>
            <UploadBox onImagesChange={handleImagesChange} />
          </ImageBox>
          <ContentBox>
            <ContentHeader>
              <ProfileBox>
                <ProfileImg src="public\assets\images\cat.png" />
              </ProfileBox>
              <NickName>{localStorage.getItem('nickname')}</NickName>
              <CloseBox onClick={handleCloseModal}>취소</CloseBox>
              <SubmitInput type="submit" value="업로드" />
            </ContentHeader>
            <ContentTextArea
              {...register('contents', { required: true, minLength: 1 })}
              cols={10}
              rows={5}
              placeholder="문구를 입력해주세요..."
            />
            <CategorySelectInfo>
              1개의 카테고리를 선택해주세요.
            </CategorySelectInfo>
            <CategoryBox>
              <CategoryButton
                type="button"
                isSelected={watch('category') === 'FOOD'}
                onClick={() => handleCategoryClick('FOOD')}
              >
                맛집
              </CategoryButton>
              <CategoryButton
                type="button"
                isSelected={watch('category') === 'CAFE'}
                onClick={() => handleCategoryClick('CAFE')}
              >
                카페
              </CategoryButton>
              <CategoryButton
                type="button"
                isSelected={watch('category') === 'PHOTOZONE'}
                onClick={() => handleCategoryClick('PHOTOZONE')}
              >
                사진스팟
              </CategoryButton>
            </CategoryBox>
            <KaKaoMap
              width="100%"
              height="240px"
              onLocationChange={handleLocationChange}
            />
          </ContentBox>
        </MainLayout>
      </form>
    </Modal>
  );
};

const CategorySelectInfo = styled.div`
  color: gray;
  font-size: 13px;
  padding-left: 25px;
`;

const CloseBox = styled.div`
  display: flex;
  align-items: center;
  width: 60px;
  margin: 15px 0px;
  color: gray;
  font-size: 13px;
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
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  overflow: hidden;

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
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 40px;
  padding: 15px 0px 0px 20px;
  border: none;
  border-radius: 100px;
`;

const ProfileImg = styled.img`
  width: 45px;
  height: 45px;
  border: none;
  border-radius: 100px;
  object-fit: cover;
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
  padding: 12px 20px;
  border: none;
  font-size: 14px;
  resize: none;
  outline: none;

  &::-webkit-scrollbar {
    width: 8px;
    height: 20px;
  }

  &::-webkit-scrollbar-track {
    background-color: white;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background-color: gray;
  }
`;

const SubmitInput = styled.input`
  width: 100px;
  margin: 20px 30px 20px 10px;
  padding: 0px 12px;
  background-color: #00a3ff;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 13px;
  cursor: pointer;
`;

export default CreatePostModal;
