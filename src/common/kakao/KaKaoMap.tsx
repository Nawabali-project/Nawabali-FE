/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import styled from 'styled-components';

declare global {
  interface Window {
    kakao: any;
  }
}

const KaKaoMap = () => {
  const [map, setMap] = useState<any>();
  const [marker, setMarker] = useState<any>();

  // 1. 카카오맵 불러오기
  useEffect(() => {
    window.kakao.maps.load(() => {
      const container = document.getElementById('map');
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };

      setMap(new window.kakao.maps.Map(container, options));
      setMarker(new window.kakao.maps.Marker());
    });
  }, []);

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
    // 현재 위치의 위도, 경도
    const currentPos = new window.kakao.maps.LatLng(
      pos.coords.latitude, // 위도
      pos.coords.longitude, // 경도
    );

    // 지도를 현재 위치로 이동시킨다.
    map.panTo(currentPos);

    // 기존 마커를 제거하고 새로운 마커를 넣는다.
    marker.setMap(null);
    marker.setPosition(currentPos);
    marker.setMap(map);
  };

  return (
    <>
      <MapBox id="map" style={{ width: '500px', height: '400px' }}></MapBox>
      <MyLocationBtn onClick={getCurrentPosBtn}>현 위치</MyLocationBtn>
    </>
  );
};

const MapBox = styled.div`
  margin: 10px;
  border: 5px solid #beedff;
  border-radius: 30px;
`;

const MyLocationBtn = styled.div`
  background-color: #beedff;
  width: 55px;
  margin: 10px;
  padding: 10px;
  border: none;
  border-radius: 30px;
`;

export default KaKaoMap;
