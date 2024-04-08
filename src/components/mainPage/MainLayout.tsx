import { GlobalIcon, ListIcon, MapIcon, StarIcon } from '@/utils/icons/icons';
import Feed from './Feed';
import styled from 'styled-components';
import { useState } from 'react';
import Map from './Map';
import News from './News';
import Score from './Score';
import { BottomArrowIcon } from '@/utils/icons/icons';

// 반응형 구조 할 예정...
const MainLayout = () => {
  const [clickedCategory, setClickedCategory] = useState<string>('map');

  return (
    <Layout>
      <CategoryBox>
        <AreaBox>
          서교동
          <BottomArrowIcon />
        </AreaBox>
        <ThreeKindBox>
          <KindBox>맛집</KindBox>
          <KindBox>카페</KindBox>
          <KindBox>사진스팟</KindBox>
        </ThreeKindBox>

        <ThreeComponentBox>
          <MapCategory onClick={() => setClickedCategory('map')}>
            <MapIcon />
            지도 <BottomArrowIcon />
          </MapCategory>
          <ListCategory onClick={() => setClickedCategory('feeds')}>
            <ListIcon />
            리스트
          </ListCategory>
          <ScoreCategory onClick={() => setClickedCategory('score')}>
            <GlobalIcon />
            동네별 점수
          </ScoreCategory>
          <NewsCategory onClick={() => setClickedCategory('news')}>
            <StarIcon />
            동네소식
          </NewsCategory>
        </ThreeComponentBox>
      </CategoryBox>
      {clickedCategory === 'score' && <Score />}
      {clickedCategory === 'map' && <Map />}
      {clickedCategory === 'feeds' && (
        <FeedsBox>
          <Feed />
        </FeedsBox>
      )}
      {clickedCategory === 'news' && <News />}
    </Layout>
  );
};

const Layout = styled.div``;

const AreaBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  cursor: pointer;
`;

const CategoryBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  height: 50px;
`;

const ThreeKindBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  cursor: pointer;
`;

const KindBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  padding: 5px 10px;
  border: none;
  border-radius: 300px;
  box-shadow: 0px 0px 8px #d8d8d8;
  cursor: pointer;
`;

const ThreeComponentBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const ScoreCategory = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  cursor: pointer;
`;

const MapCategory = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  cursor: pointer;
`;

const ListCategory = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  cursor: pointer;
`;

const NewsCategory = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  cursor: pointer;
`;

const FeedsBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5px;
`;

export default MainLayout;
