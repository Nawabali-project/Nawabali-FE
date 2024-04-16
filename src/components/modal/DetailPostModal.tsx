import Modal from './Modal';
import styled from 'styled-components';
import {
  CloseIcon,
  ThreePointIcon,
  LikeIcon,
  BookMarkIcon,
  LeftTranslucentIcon,
  RightTranslucentIcon,
  LocationWhiteIcon,
  LikeFilledIcon,
  BookMarkFilledIcon,
} from '@/utils/icons';
import { useGetDedetailPost } from '@/api/post';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { checkLike, checkLocalLike } from '@/api/likeBookmark';
import { useQueryClient } from '@tanstack/react-query';

interface DetailPostProps {
  postId: number;
  setIsDetailPostModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DetailPostModal: React.FC<DetailPostProps> = ({
  postId,
  setIsDetailPostModalOpen,
}) => {
  const { data, isFetching, isError, error } = useGetDedetailPost(postId);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isLocalLiked, setIsLocalLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const queryClient = useQueryClient();

  // 여러 사진 미리보기 동작
  const goNextImg = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.imageUrls.length);
  };
  const goPrevImg = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + data.imageUrls.length) % data.imageUrls.length,
    );
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setIsDetailPostModalOpen(false);
  };

  // 좋아요 클릭 동작
  const checkLikeMutation = useMutation({
    mutationFn: checkLike,
    onSuccess: async () => {
      queryClient.invalidateQueries();
    },
  });

  const handleLikeClick = (postId: number) => {
    setIsLiked(!isLiked);
    checkLikeMutation.mutate(postId);
  };

  // 주민추천 클릭 동작
  const checkLocalLikeMutation = useMutation({
    mutationFn: checkLocalLike,
    onSuccess: async () => {
      queryClient.invalidateQueries();
    },
  });

  const handleLocalLikeClick = (postId: number) => {
    setIsLocalLiked(!isLocalLiked);
    checkLocalLikeMutation.mutate(postId);
  };

  console.log('id: ', postId);
  console.log('detail data: ', data);
  if (isFetching) {
    return <p>Loading...</p>;
  }

  if (isError) {
    console.error(error);
    return <p>Error loading the post details!</p>;
  }

  if (!data) {
    return null;
  }

  return (
    <>
      <Modal>
        <CloseBox onClick={handleCloseModal}>
          <CloseIcon />
        </CloseBox>
        <LocationBox>
          <LocationWhiteIcon />
          &nbsp;{data.district}
        </LocationBox>

        <MainLayout>
          <ImageBox>
            <img
              src={data?.imageUrls[currentIndex]}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {data.imageUrls.length > 1 && (
              <>
                <LeftIconBox
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goPrevImg();
                  }}
                >
                  <LeftTranslucentIcon />
                </LeftIconBox>

                <RightIconBox
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goNextImg();
                  }}
                >
                  <RightTranslucentIcon />
                </RightIconBox>
                <DotsBox>
                  {data.imageUrls.map((_: null, index: number) => (
                    <Dot key={index} active={currentIndex === index} />
                  ))}
                </DotsBox>
              </>
            )}
          </ImageBox>
          <DotsBox>
            {data.imageUrls.map((_: null, index: number) => {
              <Dot key={index} active={currentIndex === index} />;
            })}
          </DotsBox>

          <ContentBox>
            <ContentHeader>
              <ProfileBox>
                <ProfileImg />
              </ProfileBox>
              <div>
                <NameAndIcon>
                  <NickName>{data?.nickname}</NickName>
                  <ThreePointIconBox>
                    <ThreePointIcon />
                  </ThreePointIconBox>
                </NameAndIcon>
                <ContentText>{data?.contents}</ContentText>
              </div>
            </ContentHeader>

            <CommentBox>댓글창~</CommentBox>
            <ItemBox>
              <LikesBox>
                <LocalLikesBox
                  onClick={() => handleLocalLikeClick(data?.postId)}
                >
                  주민추천 {data?.localLikesCount}
                </LocalLikesBox>
                <LikeIconBox onClick={() => handleLikeClick(data?.postId)}>
                  {isLiked ? <LikeFilledIcon /> : <LikeIcon />}
                  <LikeCount>{data?.likesCount}</LikeCount>
                </LikeIconBox>
              </LikesBox>
              <div onClick={() => setIsBookmarked(!isBookmarked)}>
                {isBookmarked ? <BookMarkFilledIcon /> : <BookMarkIcon />}
              </div>
            </ItemBox>

            <MyCommentBox>
              <MyProfile></MyProfile>
              <MyCommentInput placeholder="댓글 달기"></MyCommentInput>
            </MyCommentBox>
          </ContentBox>
        </MainLayout>
      </Modal>
    </>
  );
};

const LocationBox = styled.div`
  position: absolute;
  left: 21.5%;
  top: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7px 10px;
  color: white;
  background-color: #000000;
  opacity: 0.6;
  border-radius: 100px;
  font-size: 13px;
`;

const LeftIconBox = styled.button`
  position: absolute;
  top: 270px;
  left: 5px;
  width: 32px;
  height: 32px;
  z-index: 2;
  border: none;
  border-radius: 100px;
  background-color: transparent;
  cursor: pointer;
`;

const RightIconBox = styled.button`
  position: absolute;
  top: 270px;
  right: 495px;
  width: 32px;
  height: 32px;
  z-index: 2;
  border: none;
  border-radius: 100px;
  background-color: transparent;
  cursor: pointer;
`;

const DotsBox = styled.div`
  position: absolute;
  bottom: 10px;
  left: 23%;
`;

const Dot = styled.span<{ active: boolean }>`
  display: inline-block;
  width: 6px;
  height: 6px;
  margin: 3px;
  background-color: ${(props) => (props.active ? '#ffffff' : '#b7b7b7')};
  border-radius: 100%;
`;

const CloseBox = styled.div`
  position: absolute;
  left: 45%;
  bottom: -80px;
  padding: 5px 6px 3px 7px;
  border-radius: 100px;
  z-index: 20;
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
  border-top-left-radius: 140px;
  border-bottom-right-radius: 140px;
  border-bottom-left-radius: 15px;
  object-fit: cover;
  overflow: hidden;
`;

const NameAndIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 370px;
`;

const ContentBox = styled.div`
  width: 480px;
  height: 600px;
`;

const ContentHeader = styled.div`
  display: flex;
  margin-top: 15px;
  border-bottom: 1px solid #f1f1f1;
`;

const ProfileBox = styled.div`
  width: 50px;
  padding: 10px 10px 10px 40px;
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

const ContentText = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 120px;
  border: none;
  font-size: 15px;
  resize: none;
`;

const ThreePointIconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  padding-bottom: 10px;
  margin-right: 10px;
`;

const CommentBox = styled.div`
  width: 420px;
  height: 220px;
  padding: 12px 60px;
  border-bottom: 1px solid #f1f1f1;
`;

const ItemBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 50px 0px 50px;
  margin: 15px 0px 5px 0px;
`;

const LikesBox = styled.div`
  display: flex;
  cursor: pointer;
`;

const LikeCount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 6px;
`;

const LocalLikesBox = styled.div`
  padding: 8px 18px;
  border-radius: 300px;
  background-color: #00a3ff;
  color: white;
`;

const LikeIconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 7px 20px;
`;

const MyCommentBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

const MyProfile = styled.div`
  width: 13px;
  height: 13px;
  background-color: #f1f1f1;
  padding: 20px;
  margin: 0px 10px;
  border: none;
  border-radius: 100px;
`;

const MyCommentInput = styled.input`
  width: 280px;
  height: 20px;
  padding: 12px 20px;
  border: 1px solid #d9d9d9;
  border-radius: 60px;
`;

export default DetailPostModal;
