import {
  CafeIcon,
  GlobalIcon,
  ListIcon,
  StarIcon,
  BottomArrowIcon,
  FoodIcon,
  CameraIcon2,
  MapBlackIcon,
  FoodFilledIcon,
  CameraFilledIcon,
  CafeFilledIcon,
  BigLocationIcon,
} from '@/utils/icons';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import CustomMap from '@/components/customMap/CustomMap';
import { useLocation, useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';

const MapPage = () => {
  const [clickedKind, setClickedKind] = useState<string | null>(null);
  const [selectedLatitude, setSelectedLatitude] = useState<number | null>(null);
  const [selectedLongitude, setSelectedLongitude] = useState<number | null>(
    null,
  );
  const navigate = useNavigate();

  const [selectedArea, setSelectedArea] = useState('서울특별시');
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const location = useLocation();
  const cookie = new Cookies();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get('accessToken')?.split(' ')[1];
    console.log('URL 토큰:', token, { path: '/', secure: false });
    const accessToken = urlParams.get('accessToken');
    console.log('파람에서 추출한 accessToken: ', accessToken);

    if (token) {
      console.log('토큰 존재:', token);
      cookie.set('accessToken', token);
    } else {
      console.log('토큰 없음');
    }
  }, [location]);

  const handleSelectArea = (areaName: string) => {
    setSelectedArea(areaName);
    setShowDropdown(false);

    // 선택된 지역의 위도와 경도를 찾아서 설정
    const selectedDistrict = seoulDistricts.find(
      (district) => district.name === areaName,
    );
    if (selectedDistrict) {
      setSelectedLatitude(selectedDistrict.latitude);
      setSelectedLongitude(selectedDistrict.longitude);
    } else {
      setSelectedLatitude(null);
      setSelectedLongitude(null);
    }
  };

  const handleKindClick = (kind: string) => {
    setClickedKind(clickedKind === kind ? null : kind);
  };

  const seoulDistricts = [
    { name: '서울특별시', latitude: 37.555949, longitude: 126.972309 },
    { name: '서울특별시 강남구', latitude: 37.5172, longitude: 127.0473 },
    { name: '서울특별시 강동구', latitude: 37.5301, longitude: 127.1238 },
    { name: '서울특별시 강북구', latitude: 37.6396, longitude: 127.0257 },
    { name: '서울특별시 강서구', latitude: 37.5509, longitude: 126.8497 },
    { name: '서울특별시 관악구', latitude: 37.4784, longitude: 126.9516 },
    { name: '서울특별시 광진구', latitude: 37.5385, longitude: 127.0823 },
    { name: '서울특별시 구로구', latitude: 37.4954, longitude: 126.8874 },
    { name: '서울특별시 금천구', latitude: 37.4568, longitude: 126.8954 },
    { name: '서울특별시 노원구', latitude: 37.6542, longitude: 127.0568 },
    { name: '서울특별시 도봉구', latitude: 37.6688, longitude: 127.0471 },
    { name: '서울특별시 동대문구', latitude: 37.5744, longitude: 127.0403 },
    { name: '서울특별시 동작구', latitude: 37.5124, longitude: 126.9393 },
    { name: '서울특별시 마포구', latitude: 37.5663, longitude: 126.9014 },
    { name: '서울특별시 서대문구', latitude: 37.5791, longitude: 126.9368 },
    { name: '서울특별시 서초구', latitude: 37.4837, longitude: 127.0324 },
    { name: '서울특별시 성동구', latitude: 37.5633, longitude: 127.0371 },
    { name: '서울특별시 성북구', latitude: 37.5891, longitude: 127.0166 },
    { name: '서울특별시 송파구', latitude: 37.5145, longitude: 127.1066 },
    { name: '서울특별시 양천구', latitude: 37.5169, longitude: 126.8664 },
    { name: '서울특별시 영등포구', latitude: 37.5264, longitude: 126.8962 },
    { name: '서울특별시 용산구', latitude: 37.5326, longitude: 126.9909 },
    { name: '서울특별시 은평구', latitude: 37.6027, longitude: 126.9291 },
    { name: '서울특별시 종로구', latitude: 37.573, longitude: 126.9794 },
    { name: '서울특별시 중구', latitude: 37.5638, longitude: 126.9976 },
    { name: '서울특별시 중랑구', latitude: 37.6066, longitude: 127.0928 },
  ];

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
                <DropdownItem
                  key={area.name}
                  onClick={() => handleSelectArea(area.name)}
                >
                  {area.name}
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
          <FourCategory>
            <MapBlackIcon />
            <SelectedPageComment>&nbsp;지도</SelectedPageComment>
          </FourCategory>
          <FourCategory onClick={() => navigate('/listpage')}>
            <ListIcon />
            &nbsp;리스트
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

      <CustomMap
        width="100%"
        height="811px"
        clickedCategory={clickedKind}
        selectedDistrict={selectedArea}
        selectedLatitude={selectedLatitude}
        selectedLongitude={selectedLongitude}
      />
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

const SelectedPageComment = styled.div`
  color: black;
`;

export default MapPage;
