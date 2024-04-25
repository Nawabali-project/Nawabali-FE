/* eslint-disable @typescript-eslint/no-explicit-any */
import KaKaoMap from '@/components/address/KaKaoMap';
import styled from 'styled-components';
import Modal from './Modal';
import UploadBox from '../uploadImg/UploadBox';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost } from '@/api/post';
import AlertModal from './AlertModal';

interface CreatePostProps {
  setIsAddPostModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface CategoryButtonProps {
  $isSelected: boolean;
}

interface FormValue {
  file: File[];
  contents: string;
  category: string;
  latitude: number;
  longitude: number;
  district: string;
  placeName: string;
  placeAddr: string;
}

const CreatePostModal: React.FC<CreatePostProps> = (props) => {
  const { register, handleSubmit, setValue } = useForm<FormValue>();
  const [, setImages] = useState<File[]>([]);
  const [content, setContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<React.ReactNode>('');
  const [alertType, setAlertType] = useState('');
  const queryClient = useQueryClient();

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
    placeName: string,
    placeAddr: string,
  ) => {
    setValue('latitude', latitude);
    setValue('longitude', longitude);
    setValue('district', district);
    setValue('placeName', placeName);
    setValue('placeAddr', placeAddr);
  };

  // 경고창 열기
  const showAlertModal = (message: React.ReactNode) => {
    setAlertMessage(message);
    setIsAlertModalOpen(true);
  };

  // 카테고리 클릭
  const handleCategoryClick = (category: string) => {
    setValue('category', category);
    setSelectedCategory(category);
  };

  // 게시글 생성 통신
  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      handleCloseModal();
      setAlertType('complete');
      showAlertModal('게시글 작성이 완료되었어요 :)');
      queryClient.invalidateQueries({ queryKey: ['scrollPosts'] });
    },
    onError: () => {},
  });

  // 생성 form 제출
  const onSubmitHandler: SubmitHandler<FormValue> = (data) => {
    if (!data.file || data.file.length === 0) {
      setAlertType('error');
      showAlertModal('사진을 하나 이상 올려주세요 :)');
      return;
    } else if (!data.contents) {
      setAlertType('error');
      showAlertModal('내용을 작성해주세요 :)');
      return;
    } else if (!data.category) {
      setAlertType('error');
      showAlertModal('카테고리 선택을 깜박하셨네요 :)');
      return;
    } else if (data.district !== localStorage.getItem('district')) {
      setAlertType('error');
      showAlertModal([
        '본인이 사는 ',
        <strong>&nbsp;'구'&nbsp;</strong>,
        '에만 작성할 수 있어요 :)',
      ]);
      return;
    }

    const formData = new FormData();

    const requestDto = {
      contents: data.contents,
      category: data.category,
      latitude: data.latitude,
      longitude: data.longitude,
      district: data.district,
      placeName: data.placeName,
      placeAddr: data.placeAddr,
    };

    formData.append('requestDto', JSON.stringify(requestDto));

    // 기존 방식
    let files: File[] = [];
    data.file.forEach((file: any) => {
      files.push(file);
    });

    files.forEach((file: File) => {
      formData.append('files', file);
    });

    // // webp 적용 방식
    // data.file.forEach((file) => {
    //   const newFile = new File([file], file.name, {
    //     type: file.type,
    //     lastModified: file.lastModified,
    //   });
    //   formData.append('files', newFile);
    // });

    console.log('폼 데이터 값 출력');
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: `, value);
    }

    createPostMutation.mutate(formData);
  };

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  return (
    <Modal isAlertModalOpen={isAlertModalOpen}>
      <form onSubmit={handleSubmit(onSubmitHandler)} onKeyDown={handleKeyDown}>
        <MainLayout>
          <ImageBox>
            <UploadBox onImagesChange={handleImagesChange} />
          </ImageBox>
          <ContentBox>
            <ContentHeader>
              <ProfileBox>
                <ProfileImg
                  src={localStorage.getItem('profileImageUrl') ?? undefined}
                />
              </ProfileBox>
              <NickName>{localStorage.getItem('nickname')} </NickName>
              <CloseBox onClick={handleCloseModal}>취소</CloseBox>
              <SubmitInput type="submit" value="업로드" />
            </ContentHeader>
            <ContentTextArea
              {...register('contents', { minLength: 1 })}
              cols={10}
              rows={5}
              placeholder="문구를 입력해주세요..."
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                setValue('contents', e.target.value);
              }}
            />
            <CharacterCount>{content.length}/500</CharacterCount>
            <CategorySelectInfo>
              1개의 카테고리를 선택해주세요.
            </CategorySelectInfo>
            <CategoryBox>
              <CategoryButton
                type="button"
                $isSelected={selectedCategory === 'FOOD'}
                onClick={() => handleCategoryClick('FOOD')}
                color="#FE6847"
              >
                맛집
              </CategoryButton>
              <CategoryButton
                type="button"
                $isSelected={selectedCategory === 'CAFE'}
                onClick={() => handleCategoryClick('CAFE')}
                color="#9BCF53"
              >
                카페
              </CategoryButton>
              <CategoryButton
                type="button"
                $isSelected={selectedCategory === 'PHOTOZONE'}
                onClick={() => handleCategoryClick('PHOTOZONE')}
                color="#00A3FF"
              >
                사진스팟
              </CategoryButton>
            </CategoryBox>
            <KaKaoMap
              width="100%"
              height="285px"
              onLocationChange={handleLocationChange}
            />
          </ContentBox>
        </MainLayout>
      </form>
      {isAlertModalOpen && (
        <AlertModal
          message={alertMessage}
          closeAlert={() => setIsAlertModalOpen(false)}
          alertType={alertType}
        />
      )}
    </Modal>
  );
};

const CharacterCount = styled.div`
  text-align: right;
  margin: 0px 35px 0px 0px;
  color: gray;
  font-size: 12px;
  padding-right: 10px;
`;

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
  height: 620px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  overflow: hidden;

  .file {
    display: none;
  }

  .preview {
    width: 500px;
    height: 620px;
    margin: auto;
    background-color: #f1f1f1;
    border-top-left-radius: 150px;
    border-bottom-right-radius: 150px;
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
  background-color: ${(props) => (props.$isSelected ? props.color : 'white')};
  color: ${(props) => (props.$isSelected ? 'white' : 'black')};
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
