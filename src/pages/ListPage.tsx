import {
  CafeIcon,
  CameraFilledIcon,
  GlobalIcon,
  StarIcon,
  BottomArrowIcon,
  TopArrowIcon,
  FoodIcon,
  FoodFilledIcon,
  CameraIcon2,
  CafeFilledIcon,
  MapIcon,
  ListBlackIcon,
  BigLocationIcon,
} from '@/utils/icons';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FeedList from '@/components/feedList/FeedList';

const ListPage = () => {
  const [clickedKind, setClickedKind] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const districtQuery = query.get('district');
  const district = districtQuery ? `서울특별시 ${districtQuery}` : '서울특별시';
  const category = query.get('category');

  useEffect(() => {
    if (district) {
      setSelectedArea(district);
    }
    if (category) {
      setClickedKind(category);
    }
  }, [district, category]);

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

  return (
    <Layout>
      <CategoryBox>
        <SecondHeader>
          <AreaBox onClick={toggleDropdown}>
            <BigLocationIcon />
            &nbsp; {selectedArea}&nbsp;
            {showDropdown ? <TopArrowIcon /> : <BottomArrowIcon />}
            {showDropdown && (
              <DropdownMenu>
                {seoulDistricts.map((area) => (
                  <DropdownItem
                    key={area}
                    onClick={() => handleSelectArea(area)}
                  >
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

          <FourComponentBox>
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
          </FourComponentBox>
        </SecondHeader>
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

const SecondHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1280px;
`;

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
  display: flex;
  justify-content: center;
  padding-top: 120px;
`;

const AreaBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  min-width: 180px;
  margin: 0 10px 0 20px;
  cursor: pointer;
`;

const CategoryBox = styled.div`
  position: fixed;
  top: 61.25px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-evenly;
  background-color: white;
  height: 65px;
  border-bottom: 1px solid #d9d9d9;
  z-index: 9;
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
  padding: 6px 9px;
  width: ${(props) => {
    return props.kind == 'PHOTOZONE' ? '84px' : '60px';
  }};
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

const FourComponentBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 392px;
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
  justify-content: flex-start;
  width: 1280px;
  gap: 5px;
`;

const SelectedPageComment = styled.div`
  color: black;
`;

export default ListPage;
