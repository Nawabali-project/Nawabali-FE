import {
  CafeIcon,
  CameraFilledIcon,
  GlobalIcon,
  StarIcon,
  BottomArrowIcon,
  FoodIcon,
  FoodFilledIcon,
  CameraIcon2,
  CafeFilledIcon,
  MapIcon,
  ListBlackIcon,
} from '@/utils/icons';
import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Feed from '@/components/feedList/FeedList';

const ListPage = () => {
  const [clickedKind, setClickedKind] = useState<string | null>(null);
  const navigate = useNavigate();

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
            kind="FOOD"
            isSelected={clickedKind === 'FOOD'}
            onClick={() => handleKindClick('FOOD')}
          >
            {clickedKind === 'FOOD' ? <FoodIcon /> : <FoodFilledIcon />}
            &nbsp;맛집
          </KindBox>
          <KindBox
            kind="CAFE"
            isSelected={clickedKind === 'CAFE'}
            onClick={() => handleKindClick('CAFE')}
          >
            {clickedKind === 'CAFE' ? <CafeIcon /> : <CafeFilledIcon />}
            &nbsp;카페
          </KindBox>
          <KindBox
            kind="PHOTOZONE"
            isSelected={clickedKind === 'PHOTOZONE'}
            onClick={() => handleKindClick('PHOTOZONE')}
          >
            {clickedKind === 'PHOTOZONE' ? (
              <CameraIcon2 />
            ) : (
              <CameraFilledIcon />
            )}
            &nbsp;사진스팟
          </KindBox>
        </ThreeKindBox>

        <ThreeComponentBox>
          <FourCategory onClick={() => navigate('/')}>
            <MapIcon />
            &nbsp;지도
          </FourCategory>
          <FourCategory>
            <ListBlackIcon />
            <SelectedPageComment>&nbsp;리스트</SelectedPageComment>
          </FourCategory>
          <FourCategory onClick={() => navigate('/scorepage')}>
            <GlobalIcon />
            &nbsp;동네별 활동점수
          </FourCategory>
          <FourCategory onClick={() => navigate('/newspage')}>
            <StarIcon />
            &nbsp;동네소식
          </FourCategory>
        </ThreeComponentBox>
      </CategoryBox>

      <FeedsBox>
        <Feed />
      </FeedsBox>
    </Layout>
  );
};

const Layout = styled.div`
  padding-top: 61.25px;
`;

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
    } else if (props.kind == 'FOOD') {
      return '#FE6847';
    } else if (props.kind == 'CAFE') {
      return '#9BCF53';
    } else if (props.kind == 'PHOTOZONE') {
      return '#00A3FF';
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

const FourCategory = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
  color: #a1a1a1;
  font-weight: bold;
  cursor: pointer;
`;

const FeedsBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5px;
`;

const SelectedPageComment = styled.div`
  color: black;
`;

export default ListPage;
