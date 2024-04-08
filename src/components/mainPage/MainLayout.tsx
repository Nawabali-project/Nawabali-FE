import { GlobalIcon, ListIcon, MapIcon, StarIcon } from '@/utils/icons/icons';
import Feed from './Feed';
import styled from 'styled-components';
import { useState } from 'react';
import Map from './Map';
import News from './news/News';
import Score from './Score';

// 반응형 구조
const MainLayout = () => {
  const [clickedCategory, setClickedCategory] = useState<string>('map');

  return (
    <Layout>
      <CategoryBox>
        <ScoreCategory onClick={() => setClickedCategory('score')}>
          <GlobalIcon />
          동네별 점수
        </ScoreCategory>
        <MapCategory onClick={() => setClickedCategory('map')}>
          <MapIcon />
          지도
        </MapCategory>
        <ListCategory onClick={() => setClickedCategory('feeds')}>
          <ListIcon />
          리스트
        </ListCategory>
        <NewsCategory onClick={() => setClickedCategory('news')}>
          <StarIcon />
          동네소식
        </NewsCategory>
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

const Layout = styled.div`
  padding: 0 10%;
`;

const CategoryBox = styled.div`
  display: flex;
  height: 50px;
  padding: 0 10%;
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
