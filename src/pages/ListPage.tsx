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
  BigLocationIcon,
} from '@/utils/icons';
import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FeedList from '@/components/feedList/FeedList';

const ListPage = () => {
  const [clickedKind, setClickedKind] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleKindClick = (kind: string) => {
    setClickedKind(clickedKind === kind ? null : kind);
  };

  const [selectedArea, setSelectedArea] = useState('서울특별시');
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const handleSelectArea = (area: string) => {
    setSelectedArea(area);
    setShowDropdown(false);
  };

  const seoulDistricts = [
    '서울특별시',
    '서울특별시 강남구',
    '서울특별시 강동구',
    '서울특별시 강북구',
    '서울특별시 강서구',
    '서울특별시 관악구',
    '서울특별시 광진구',
    '서울특별시 구로구',
    '서울특별시 금천구',
    '서울특별시 노원구',
    '서울특별시 도봉구',
    '서울특별시 동대문구',
    '서울특별시 동작구',
    '서울특별시 마포구',
    '서울특별시 서대문구',
    '서울특별시 서초구',
    '서울특별시 성동구',
    '서울특별시 성북구',
    '서울특별시 송파구',
    '서울특별시 양천구',
    '서울특별시 영등포구',
    '서울특별시 용산구',
    '서울특별시 은평구',
    '서울특별시 종로구',
    '서울특별시 중구',
    '서울특별시 중랑구',
  ];

  console.log(selectedArea[1]);

  return (
    <Layout>
      <CategoryBox>
        <AreaBox onClick={toggleDropdown}>
          <BigLocationIcon />
          &nbsp; {selectedArea}&nbsp;
          <BottomArrowIcon />
          {showDropdown && (
            <DropdownMenu>
              {seoulDistricts.map((area) => (
                <DropdownItem key={area} onClick={() => handleSelectArea(area)}>
                  {area}
                </DropdownItem>
              ))}
            </DropdownMenu>
          )}
        </AreaBox>

        <ThreeKindBox>
          <KindBox
            kind="FOOD"
            $isSelected={clickedKind === 'FOOD'}
            onClick={() => handleKindClick('FOOD')}
          >
            {clickedKind === 'FOOD' ? <FoodIcon /> : <FoodFilledIcon />}
            &nbsp;맛집
          </KindBox>
          <KindBox
            kind="CAFE"
            $isSelected={clickedKind === 'CAFE'}
            onClick={() => handleKindClick('CAFE')}
          >
            {clickedKind === 'CAFE' ? <CafeIcon /> : <CafeFilledIcon />}
            &nbsp;카페
          </KindBox>
          <KindBox
            kind="PHOTOZONE"
            $isSelected={clickedKind === 'PHOTOZONE'}
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
        <FeedList
          category={clickedKind}
          district={selectedArea.split(' ')[1]}
        />
      </FeedsBox>
    </Layout>
  );
};

const DropdownMenu = styled.div`
  position: absolute;
  top: 45px;
  left: 0;
  background-color: #fff;
  border-radius: 5px;
  width: 167px;
  height: 180px;
  overflow-y: auto;
  z-index: 400;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);

  &::-webkit-scrollbar {
    width: 6px;
    height: 20px;
  }

  &::-webkit-scrollbar-track {
    background-color: white;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background-color: gray;
  }
`;

const DropdownItem = styled.div`
  padding: 8px 16px;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`;

const Layout = styled.div`
  padding-top: 61.25px;
`;

const AreaBox = styled.div`
  position: relative;
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

const KindBox = styled.div<{ $isSelected?: boolean; kind: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  padding: 10px 15px;
  background-color: ${(props) => {
    if (!props.$isSelected) {
      return 'none';
    } else if (props.kind == 'FOOD') {
      return '#FE6847';
    } else if (props.kind == 'CAFE') {
      return '#9BCF53';
    } else if (props.kind == 'PHOTOZONE') {
      return '#00A3FF';
    }
  }};
  color: ${(props) => (props.$isSelected ? 'white' : 'none')};
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
