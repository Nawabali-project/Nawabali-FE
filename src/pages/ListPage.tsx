import {
  DonutIcon,
  GlobalIcon,
  StarIcon,
  BottomArrowIcon,
  FoodIcon,
  CameraIcon2,
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
