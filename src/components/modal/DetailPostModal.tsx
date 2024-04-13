import Modal from './Modal';
import styled from 'styled-components';
import {
  BackIcon,
  ThreePointIcon,
  LikeIcon,
  BookMarkIcon,
} from '@/utils/icons';
import { useGetDedetailPost } from '@/api/post';

interface DetailPostProps {
  postId: number;
  setIsDetailPostModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DetailPostModal: React.FC<DetailPostProps> = ({
  postId,
  setIsDetailPostModalOpen,
}) => {
  const { data, isFetching, isError, error } = useGetDedetailPost(postId);

  const handleCloseModal = () => {
    setIsDetailPostModalOpen(false);
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
        <BackBox onClick={handleCloseModal}>
          <BackIcon />
        </BackBox>

        <MainLayout>
          <ImageBox>
            <img
              src={data?.imageUrls?.[0]}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </ImageBox>

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
                <LocalLikesBox>주민추천 {data?.localLikesCount}</LocalLikesBox>
                <LikeIconBox>
                  <LikeIcon />
                  <LikeCount>{data?.likesCount}</LikeCount>
                </LikeIconBox>
              </LikesBox>
              <BookMarkIcon />
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

const BackBox = styled.div`
  position: absolute;
  left: 10px;
  top: 10px;
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
  padding: 15px 40px 25px 40px;
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
