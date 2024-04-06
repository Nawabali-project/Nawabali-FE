/* eslint-disable @typescript-eslint/no-explicit-any */
import useDidMountEffect from '@/hooks/useDidMountEffect';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MyLocationIcon } from '@/utils/regex/icons/icons';

declare global {
  interface Window {
    kakao: any;
  }
}

interface KaKaoMapProps {
  width: string;
  height: string;
}

const CustomMap = ({ width, height }: KaKaoMapProps) => {
  const [map, setMap] = useState<any>();
  const [marker, setMarker] = useState<any>();
  const [, setPointAddr] = useState<string>('');

  // 1. 카카오맵 불러오기 및 초기 지도 설정
  useEffect(() => {
    window.kakao.maps.load(() => {
      const container = document.getElementById('map');
      const options = {
        center: new window.kakao.maps.LatLng(37.555949, 126.973309),
        level: 3,
      };

      const initialMap = new window.kakao.maps.Map(container, options);
      setMap(initialMap); // 지도 객체를 상태에 저장
      setMarker(new window.kakao.maps.Marker()); // 마커 객체 초기화
    });
  }, []);

  // 2. 지도 객체가 준비되면 커스텀 마커 추가
  useEffect(() => {
    if (map) {
      // map 상태가 설정된 후에 실행
      const restaurantImageSrc =
        'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png';
      const cafeImageSrc =
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8vlrxH5YJqwjAIWtE0EUoMxeV8qh59sDR5Q&s';
      const photoImageSrc =
        'data:image/png;base64,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';

      const imageSize = new window.kakao.maps.Size(64, 69);
      const imageOption = { offset: new window.kakao.maps.Point(27, 69) };

      const restaurantMarkerImage = new window.kakao.maps.MarkerImage(
        restaurantImageSrc,
        imageSize,
        imageOption,
      );
      const cafeMarkerImage = new window.kakao.maps.MarkerImage(
        cafeImageSrc,
        imageSize,
        imageOption,
      );
      const photoMarkerImage = new window.kakao.maps.MarkerImage(
        photoImageSrc,
        imageSize,
        imageOption,
      );

      const restaurantMarkerPosition = new window.kakao.maps.LatLng(
        37.555949,
        126.973309,
      );

      const cafeMarkerPosition = new window.kakao.maps.LatLng(
        37.554949,
        126.975309,
      );
      const photoMarkerPosition = new window.kakao.maps.LatLng(
        37.556949,
        126.977309,
      );

      const restaurantMarker = new window.kakao.maps.Marker({
        position: restaurantMarkerPosition,
        image: restaurantMarkerImage,
      });
      const cafeMarker = new window.kakao.maps.Marker({
        position: cafeMarkerPosition,
        image: cafeMarkerImage,
      });
      const photoMarker = new window.kakao.maps.Marker({
        position: photoMarkerPosition,
        image: photoMarkerImage,
      });

      restaurantMarker.setMap(map);
      cafeMarker.setMap(map);
      photoMarker.setMap(map);

      let content = `<div>최경일</div>`;
      let position = new window.kakao.maps.LatLng(37.556949, 126.977309);
      let customOverlay = new window.kakao.maps.CustomOverlay({
        position: position,
        content: content,
        yAnchor: 3,
      });

      // 커스텀 오버레이를 지도에 표시합니다
      customOverlay.setMap(map);
    }
  }, [map]);

  // 3. 현재 위치 함수
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

  // 4. 현재 위치 함수가 정상 작동하면 실행
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

              marker.setMap(null);
              marker.setPosition(mouseEvent.latLng);
              marker.setMap(map);
            }
          },
        );
      },
    );
  }, [map]);

  return (
    <Layout>
      <MapContainer style={{ width, height }}>
        <MapBox id="map" style={{ width: '100%', height: '100%' }}></MapBox>
        <MyLocationBtn onClick={getCurrentPosBtn}>
          <MyLocationIcon />
        </MyLocationBtn>
      </MapContainer>
    </Layout>
  );
};

const Layout = styled.div`
  padding: 10px;
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
  padding: 5px 6px 3px 7px;
  border: 1px solid #c2c2c2;
  border-radius: 100px;
  background: white;
  z-index: 1;
  cursor: pointer;

  &:hover {
    background-color: #f1f1f1;
  }
`;

export default CustomMap;
