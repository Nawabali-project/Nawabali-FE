import styled from 'styled-components';

const SkeletonList = () => {
  return (
    <>
      {Array.from({ length: 12 }, (_, index) => (
        <Feed key={index}>
          <HeaderBox>
            <UserImg />
            <UserInfo />
          </HeaderBox>
          <ImgBox />
          <ItemBox />
          <CommentBox />
          <CommentBox />
        </Feed>
      ))}
    </>
  );
};

const Feed = styled.div`
  display: flex;
  flex-direction: column;
  width: 294.984px;
  height: 420.914px;
  margin: 10px;
`;

const HeaderBox = styled.div`
  display: flex;
  width: 294.984px;
  height: 36px;
  margin: 5px;
`;

const UserImg = styled.div`
  width: 36px;
  height: 36px;
  margin: 0 0 0 5px;
  border-radius: 1000px;
  background-color: #e5e5e5;
`;

const UserInfo = styled.div`
  width: 100px;
  height: 20px;
  margin: 10px 0 0 10px;
  background-color: #e5e5e5;
`;

const ImgBox = styled.div`
  width: 294.984px;
  height: 295px;
  background-color: #e5e5e5;
  border-top-left-radius: 50px;
  border-bottom-right-radius: 50px;
`;

const ItemBox = styled.div`
  width: 170px;
  height: 15px;
  margin: 5px;
  background-color: #e5e5e5;
`;

const CommentBox = styled.div`
  width: 100px;
  height: 10px;
  margin: 5px;
  background-color: #e5e5e5;
`;

export default SkeletonList;
