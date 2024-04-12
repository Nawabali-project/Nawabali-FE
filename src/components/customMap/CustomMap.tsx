/* eslint-disable @typescript-eslint/no-explicit-any */
import useDidMountEffect from '@/hooks/useDidMountEffect';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MyLocationIcon } from '@/utils/icons';
import AllPosts from './AllPosts';

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

  console.log(AllPosts());
  // const data: any = AllPosts();

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
      // 커스텀 오버레이 지도에 표시
      const overlaysData = [
        {
          position: new window.kakao.maps.LatLng(37.556949, 126.970309),
          imageUrl:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuKWVV9Np9SUIivOOCIJ-HKrArI7JBPzyrkg&s',
        },
        {
          position: new window.kakao.maps.LatLng(37.556, 126.974),
          imageUrl:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwbwHqa8d2QW3VhbN9JofOlpfvnsGhX_OZNQ&s',
        },
        {
          position: new window.kakao.maps.LatLng(37.554949, 126.977309),
          imageUrl:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgg9v8AXnoOPl3tNqhXZG49gy2I9DhJfB8tA&s',
        },
      ];

      overlaysData.forEach((data) => {
        let content = `
          <div style="background-color: white; padding: 0px; border: 5px solid #fe6847; border-radius: 10px; width: 70px; height: 55px; overflow: hidden; display: flex; justify-content: center; align-items: center;">
            <img src="${data.imageUrl}" style="width: 100%; height: auto; min-height: 100%; object-fit: cover;" alt="" />
          </div>
        `;

        let customOverlay = new window.kakao.maps.CustomOverlay({
          position: data.position,
          content: content,
        });

        customOverlay.setMap(map);
      });
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
  padding: 5px 6px 3px 6px;
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
