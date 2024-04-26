import styled from 'styled-components';
import { FoodScoreIcon, CafeScoreIcon, PhotoScoreIcon } from '@/utils/icons';

const OverlayContent = ({ name, districtData }: any) => (
  <Layout>
    <TotalBox>
      <ImgBox>
        {districtData && districtData.popularCategory === 'FOOD' ? (
          <FoodScoreIcon />
        ) : districtData.popularCategory === 'CAFE' ? (
          <CafeScoreIcon />
        ) : (
          <PhotoScoreIcon />
        )}
      </ImgBox>

      <NameBox>{name}</NameBox>
      <ScoreBox>
        {districtData
          ? districtData.totalPost * 10 + districtData.totalLocalLike
          : 0}
      </ScoreBox>
      <ScoreDetailBox>
        총 게시물 수 {districtData ? districtData.totalPost : 0} + 주민추천 수{' '}
        {districtData ? districtData.totalLocalLike : 0}
      </ScoreDetailBox>
      <InfoBox>
        {districtData && districtData.popularCategory === 'FOOD'
          ? '맛집'
          : districtData.popularCategory === 'CAFE'
            ? '카페'
            : '사진스팟'}{' '}
        활성화 동네에요 :)
      </InfoBox>

      <CloseButton onClick={() => window.closeOverlay?.()}>닫기</CloseButton>
    </TotalBox>
  </Layout>
);

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 300px;
  background-color: white;
  border-radius: 150px;
  box-shadow: 0px 0px 15px gray;
  // box-shadow: 5px 5px 10px gray;
  z-index: 200;
`;

const TotalBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ImgBox = styled.div`
  position: absolute;
  top: -10px;
  right: 20px;
  width: 76px;
  height: 76px;
  object-fit: cover;
`;

const NameBox = styled.div`
  margin-top: 10px;
  color: #00a3ff;
  font-weight: bold;
  font-size: 22px;
`;

const ScoreBox = styled.div`
  font-size: 70px;
  font-weight: 900;
`;

const ScoreDetailBox = styled.div`
  margin: 10px;
  color: gray;
  font-size: 13px;
`;

const InfoBox = styled.div`
  margin: 5px;
  padding-bottom: 10px;
`;

const CloseButton = styled.div`
  margin: 5px 0;
  padding: 5px 10px;
  border: none;
  color: gray;
  border-radius: 5px;
  font-size: 13px;
  cursor: pointer;
`;

export default OverlayContent;
