import {
  DonutIcon,
  GlobalIcon,
  ListIcon,
  MapIcon,
  StarIcon,
  BottomArrowIcon,
  // BottomArrowGrayIcon,
  FoodIcon,
  CameraIcon2,
  MapBlackIcon,
  ListBlackIcon,
  GlobalBlackIcon,
  StarBlackIcon,
} from '@/utils/icons/icons';
import Feed from './Feed';
import styled from 'styled-components';
import { useState } from 'react';
import Map from './Map';
import News from './news/News';
import Score from './Score';

// 반응형 구조 할 예정...
const MainLayout = () => {
  const [clickedCategory, setClickedCategory] = useState<string>('map');
  const [clickedKind, setClickedKind] = useState<string | null>(null);

  const handleKindClick = (kind: string) => {
    setClickedKind(clickedKind === kind ? null : kind);
  };
  return (
    <Layout>
      <CategoryBox>
        <AreaBox>
          서교동&nbsp;
          <BottomArrowIcon />
        </AreaBox>
        <ThreeKindBox>
          <KindBox
            kind="맛집"
            isSelected={clickedKind === '맛집'}
            onClick={() => handleKindClick('맛집')}
          >
            <FoodIcon />
            &nbsp;맛집
          </KindBox>
          <KindBox
            kind="카페"
            isSelected={clickedKind === '카페'}
            onClick={() => handleKindClick('카페')}
          >
            <DonutIcon />
            &nbsp;카페
          </KindBox>
          <KindBox
            kind="사진스팟"
            isSelected={clickedKind === '사진스팟'}
            onClick={() => handleKindClick('사진스팟')}
          >
            <CameraIcon2 />
            &nbsp;사진스팟
          </KindBox>
        </ThreeKindBox>

        <ThreeComponentBox>
          <FourCategory
            isSelected={clickedCategory === 'map'}
            onClick={() => setClickedCategory('map')}
          >
            {clickedCategory === 'map' ? <MapBlackIcon /> : <MapIcon />}
            &nbsp;지도
            {/* &nbsp;
            {clickedCategory === 'map' ? (
              <BottomArrowIcon />
            ) : (
              <BottomArrowGrayIcon />
            )} */}
          </FourCategory>
          <FourCategory
            isSelected={clickedCategory === 'feeds'}
            onClick={() => setClickedCategory('feeds')}
          >
            {clickedCategory === 'feeds' ? <ListBlackIcon /> : <ListIcon />}
            &nbsp;리스트
          </FourCategory>
          <FourCategory
            isSelected={clickedCategory === 'score'}
            onClick={() => setClickedCategory('score')}
          >
            {clickedCategory === 'score' ? <GlobalBlackIcon /> : <GlobalIcon />}
            &nbsp;동네별 점수
          </FourCategory>
          <FourCategory
            isSelected={clickedCategory === 'news'}
            onClick={() => setClickedCategory('news')}
          >
            {clickedCategory === 'news' ? <StarBlackIcon /> : <StarIcon />}
            &nbsp;동네소식
          </FourCategory>
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

const KindBox = styled.div<{ isSelected?: boolean; kind: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  padding: 10px 15px;
  background-color: ${(props) => {
    if (!props.isSelected) {
      return 'none';
    } else if (props.kind == '맛집') {
      return '#FE6847';
    } else if (props.kind == '카페') {
      return '#FFB700';
    } else if (props.kind == '사진스팟') {
      return '#2176AE';
    }
  }};
  color: ${(props) => (props.isSelected ? 'white' : 'none')};
  border: none;
  border-radius: 300px;
  box-shadow: 0px 0px 5px #d8d8d8;
  font-size: 14px;
  cursor: pointer;
`;

const ThreeComponentBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const FourCategory = styled.div<{ isSelected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
  color: ${(props) => (props.isSelected ? 'black' : '#a1a1a1')};
  font-weight: bold;
  cursor: pointer;
`;

const FeedsBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5px;
`;

export default MainLayout;
