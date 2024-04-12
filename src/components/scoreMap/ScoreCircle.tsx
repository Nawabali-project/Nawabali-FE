import styled from 'styled-components';

const ScoreCircle = () => {
  console.log('점수 원 동작');

  return (
    <>
      <Layout>
        <RegionBox>송파구</RegionBox>
        <ScoreBox>578</ScoreBox>
        <InfoBox>맛집 250개 + 카페 249개 + 사진스팟 79개</InfoBox>
        <CommentBox>송파구는 맛집 동네예요:&#41;</CommentBox>
      </Layout>
    </>
  );
};

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 300px;
  background-color: white;
  border-radius: 1000px;
`;

const RegionBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ScoreBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 70px;
  font-weight: 900;
`;

const InfoBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  color: gray;
  font-size: 13px;
`;

const CommentBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
  padding-bottom: 10px;
`;

export default ScoreCircle;
