import { CommentIcon, LikeIcon } from '@/utils/regex/icons/icons';
import styled from 'styled-components';

const catImg = '/assets/images/cat.png';

const Feed = () => {
  return (
    <FeedTotalBox>
      <UserInfoBox>
        <UserImg />
        <UserName>고앵스</UserName>
        <UserGrade>서교동 토박이</UserGrade>
      </UserInfoBox>
      <ImgBox>
        <PostType>맛집</PostType>
      </ImgBox>
      <LikeCommentBox>
        <LikeIcon />
        <LikesCountBox>7</LikesCountBox>
        <CommentIcon />
        <CommentsCountBox>6</CommentsCountBox>
      </LikeCommentBox>
    </FeedTotalBox>
  );
};

const FeedTotalBox = styled.div`
  width: 295px;
  margin: 10px;
`;

const UserInfoBox = styled.div`
  display: flex;
  width: 285px;
  margin: 5px;
`;

const UserImg = styled.div`
  width: 36px;
  height: 36px;
  background-size: cover;
  background-image: url(${catImg});
`;

const UserName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 10px 0px 10px;
  font-size: 16px;
  font-weight: bold;
`;

const UserGrade = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  color: #a1a1a1;
`;

const ImgBox = styled.div`
  position: relative;
  width: 295px;
  height: 295px;
  background-color: #d9d9d9;
  border-top-left-radius: 50px;
  border-bottom-right-radius: 50px;
`;

const PostType = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 3px 10px;
  background-color: black;
  color: white;
  border-radius: 20px;
  font-size: 9px;
  z-index: 100;
`;

const LikeCommentBox = styled.div`
  display: flex;
  width: 295px;
  padding: 5px;
`;

const LikesCountBox = styled.div`
  margin: 0px 20px 0px 5px;
`;

const CommentsCountBox = styled.div`
  margin: 0px 20px 0px 5px;
`;

export default Feed;
