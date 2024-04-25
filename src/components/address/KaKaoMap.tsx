/* eslint-disable @typescript-eslint/no-explicit-any */
import useDidMountEffect from '@/hooks/useDidMountEffect';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MyLocationIcon, SearchIcon, LocationIcon } from '@/utils/icons';
import AlertModal from '../modal/AlertModal';

declare global {
  interface Window {
    kakao: any;
  }
}

interface KaKaoMapProps {
  width: string;
  height: string;
  onLocationChange: (
    latitude: number,
    logitude: number,
    district: string,
    placeName: string,
    placeAddr: string,
  ) => void;
}

const KaKaoMap = ({ width, height, onLocationChange }: KaKaoMapProps) => {
  const [map, setMap] = useState<any>();
  const [marker, setMarker] = useState<any>();
  const [pointAddr, setPointAddr] = useState<string>('');
  const [placeName, setPlaceName] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<React.ReactNode>('');
  const [alertType, setAlertType] = useState('');

  // 경고창 열기
  const showAlertModal = (message: React.ReactNode) => {
    setAlertMessage(message);
    setIsAlertModalOpen(true);
  };

  // 1. 카카오맵 불러오기
  // useEffect(() => {
  //   window.kakao.maps.load(() => {
  //     navigator.geolocation.getCurrentPosition(
  //       (pos) => {
  //         const coords = new window.kakao.maps.LatLng(
  //           pos.coords.latitude,
  //           pos.coords.longitude,
  //         );

  //         const container = document.getElementById('map');
  //         const options = {
  //           center: coords,
  //           level: 4,
  //         };

  //         const createdMap = new window.kakao.maps.Map(container, options);
  //         setMap(createdMap);

  //         const newMarker = new window.kakao.maps.Marker({
  //           position: coords,
  //           zIndex: 300,
  //         });
  //         newMarker.setMap(createdMap);
  //         setMarker(newMarker);
  //       },
  //       () => {
  //         alert('위치 정보 가져오기 실패');
  //       },
  //       {
  //         enableHighAccuracy: true,
  //         maximumAge: 30000,
  //         timeout: 27000,
  //       },
  //     );
  //   });
  // }, []);

  // 1. 카카오맵 불러오기
  useEffect(() => {
    window.kakao.maps.load(() => {
      const container = document.getElementById('map');
      const options = {
        center: new window.kakao.maps.LatLng(37.555949, 126.972309),
        level: 7,
      };

      const mapInstance = new window.kakao.maps.Map(container, options);
      const markerInstance = new window.kakao.maps.Marker();
      setMap(mapInstance);
      setMarker(markerInstance);
    });
  }, []);

  // 주소 검색
  const handleSearch = () => {
    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(inputText, (data: any[], status: any) => {
      if (status === window.kakao.maps.services.Status.OK) {
        setSearchResults(data);
      } else {
        setAlertType('error');
        showAlertModal('검색 결과가 없습니다 ㅠㅠ');
      }
    });
  };

  const handleResultClick = (result: any) => {
    const { y, x, address_name, road_address_name, place_name } = result;
    const newAddr = road_address_name || address_name;
    const newPos = new window.kakao.maps.LatLng(y, x);

    setPointAddr(newAddr);
    setPlaceName(place_name);

    marker.setPosition(newPos);
    marker.setMap(map);
    map.panTo(newPos);
    onLocationChange(y, x, newAddr.split(' ')[1], place_name, newAddr); // 구 지역 정보를 상위 컴포넌트에 전달
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  // 2. 현재 위치 함수
  const getCurrentPosBtn = () => {
    navigator.geolocation.getCurrentPosition(
      getPosSuccess,
      () => alert('위치 정보 가져오기 실패'),
      {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000,
      },
    );
  };

  // 3. 현재 위치 함수가 정상 작동하면 실행
  const getPosSuccess = (pos: GeolocationPosition) => {
    const currentPos = new window.kakao.maps.LatLng(
      pos.coords.latitude,
      pos.coords.longitude,
    );

    map.panTo(currentPos);
    marker.setMap(null);
    marker.setPosition(currentPos);
    marker.setMap(map);
  };

  // 4. 지도에 찍는 곳으로 마커 변경
  useDidMountEffect(() => {
    window.kakao.maps.event.addListener(
      map,
      'click',
      function (mouseEvent: any) {
        let geocoder = new window.kakao.maps.services.Geocoder();

        geocoder.coord2Address(
          mouseEvent.latLng.getLng(),
          mouseEvent.latLng.getLat(),
          (result: any, status: any) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const newPointAddr = result[0].road_address
                ? result[0].road_address.address_name
                : result[0].address.address_name;

              setPointAddr(newPointAddr);
              setPlaceName('');

              marker.setMap(null);
              marker.setPosition(mouseEvent.latLng);
              marker.setMap(map);

              let district = newPointAddr.split(' ')[1];
              let placeName = '';
              let pointAddr = newPointAddr;
              updateMarkerAndLocation(
                mouseEvent.latLng,
                district,
                placeName,
                pointAddr,
              );
            }
          },
        );
      },
    );
  }, [map]);

  const updateMarkerAndLocation = (
    latLng: any,
    district: string,
    placeName: string,
    pointAddr: string,
  ) => {
    const latitude = latLng.getLat();
    const longitude = latLng.getLng();

    marker.setMap(null);
    marker.setPosition(latLng);
    marker.setMap(map);

    // 상위 컴포넌트로 위도와 경도 값 전달
    if (onLocationChange) {
      onLocationChange(latitude, longitude, district, placeName, pointAddr);
    }
  };

  return (
    <Layout>
      <AddressBox>
        <AddressName
          type="text"
          value={placeName}
          placeholder="장소명"
          readOnly
        ></AddressName>
        <AddressInput
          type="text"
          value={pointAddr}
          placeholder="주소"
          readOnly
        />
      </AddressBox>

      <SearchContainer>
        <InputContainer>
          <SearchIcon />
          <Input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="검색어를 입력해주세요."
            onKeyDown={handleKeyPress}
          />
        </InputContainer>
        <ResultBox>
          {searchResults.map((result, index) => (
            <SearchResultItem
              key={index}
              onClick={() => handleResultClick(result)}
            >
              <LocationIcon /> &nbsp;
              {result.place_name} ({result.address_name})
            </SearchResultItem>
          ))}
        </ResultBox>
      </SearchContainer>
      <MapContainer style={{ width, height }}>
        <MapBox id="map" style={{ width: '100%', height: '100%' }} />
        <MyLocationBtn onClick={getCurrentPosBtn}>
          <MyLocationIcon />
        </MyLocationBtn>
      </MapContainer>
      {isAlertModalOpen && (
        <AlertModal
          message={alertMessage}
          closeAlert={() => setIsAlertModalOpen(false)}
          alertType={alertType}
        />
      )}
    </Layout>
  );
};

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
`;

const MapContainer = styled.div`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
`;

const MapBox = styled.div`
  width: 100%;
  height: 100%;
`;

const MyLocationBtn = styled.div`
  position: absolute;
  left: 15px;
  top: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  border: 1px solid #c2c2c2;
  border-radius: 100px;
  background: white;
  z-index: 1;
  cursor: pointer;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const AddressBox = styled.div`
  display: flex;
`;

const AddressName = styled.input`
  width: 300px;
  padding: 10px;
  margin: 5px;
  background-color: #f2f2f2;
  border: none;
  border-radius: 10px;
  font-size: 12px;

  &:focus {
    outline: none;
  }
`;

const AddressInput = styled.input`
  width: 100%;
  padding: 10px;
  margin: 5px;
  background-color: #f2f2f2;
  border: none;
  border-radius: 10px;
  font-size: 12px;

  &:focus {
    outline: none;
  }
`;

const SearchContainer = styled.div`
  position: absolute;
  top: 330px;
  right: 10px;
  width: 180px;
  height: 43%;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 5px;
  z-index: 500;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 10px;
  border: 1px solid #ccc;
  background-color: white;
  border-radius: 5px;
`;

const Input = styled.input`
  border: none;
  outline: none;
  padding-left: 5px;
  width: 100%;
  font-size: 12px;
`;

const ResultBox = styled.div`
  margin: 10px 0px;
  height: 215px;
  overflow-y: auto;
  cursor: pointer;

  &::-webkit-scrollbar {
    width: 5px;
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

const SearchResultItem = styled.div`
  position: relative;
  padding: 15px 10px;
  height: 20px;
  font-size: 12px;
  cursor: pointer;
`;
export default KaKaoMap;
