import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MyLocationIcon } from '@/utils/icons';
import AllPosts from './AllPosts';
import DetailPostModal from '../modal/DetailPostModal';

declare global {
  interface Window {
    kakao: any;
    handlePostClick: (postId: number) => void;
  }
}

interface KaKaoMapProps {
  width: string;
  height: string;
  clickedCategory: string | null;
  district: string | null;
}

interface Post {
  postId: number;
  profileImageUrl: string;
  nickname: string;
  imageUrls: string[];
  category: string;
  likesCount: number;
  commentCount: number;
  contents: string;
  latitude: number;
  longitude: number;
}

interface CustomOverlay {
  setMap: (map: any | null) => void;
}

const CustomMap = ({
  width,
  height,
  clickedCategory,
  district,
}: KaKaoMapProps) => {
  const [map, setMap] = useState<any>();
  const [marker, setMarker] = useState<any>();
  const [isDetailPostModalOpen, setIsDetailPostModalOpen] =
    useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [overlays, setOverlays] = useState<CustomOverlay[]>([]);
  const data: any = AllPosts();

  // 맨 처음 지도 내 위치로 렌더링
  useEffect(() => {
    window.kakao.maps.load(() => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = new window.kakao.maps.LatLng(
            pos.coords.latitude,
            pos.coords.longitude,
          );

          const container = document.getElementById('map');
          const options = {
            center: coords,
            level: 4,
          };

          const createdMap = new window.kakao.maps.Map(container, options);
          setMap(createdMap);

          const newMarker = new window.kakao.maps.Marker({
            position: coords,
            zIndex: 300,
          });
          newMarker.setMap(createdMap);
          setMarker(newMarker);
        },
        () => {
          alert('위치 정보 가져오기 실패');
        },
        {
          enableHighAccuracy: true,
          maximumAge: 30000,
          timeout: 27000,
        },
      );
    });
  }, []);

  function getBorderColor(category: string) {
    if (category === 'FOOD') {
      return '#FE6847';
    } else if (category === 'CAFE') {
      return '#9BCF53';
    } else if (category === 'PHOTOZONE') {
      return '#00A3FF';
    }
  }

  // 지도에 커스텀 오버레이
  useEffect(() => {
    if (map && data?.data?.content.length) {
      overlays.forEach((overlay) => overlay.setMap(null));
      setOverlays([]);

      const filteredPosts =
        clickedCategory === null
          ? data.data.content
          : data.data.content.filter(
              (post: Post) => post.category === clickedCategory,
            );

      const newOverlays = filteredPosts.map((post: Post) => {
        let borderColor = getBorderColor(post.category);
        let content = `
          <div style="box-shadow: 3px 3px 6px rgba(86, 86, 86, 0.5); cursor: pointer; border: 3px solid ${borderColor}; border-radius: 10px; width: 60px; height: 60px; overflow: hidden; display: flex; justify-content: center; align-items: center;"
              onclick="window.handlePostClick(${post.postId})">
            <img src="${post.imageUrls[0]}" style="width: 100%; height: auto; min-height: 100%; object-fit: cover; pointer-events: none;" alt="" />
          </div>
        `;
        let customOverlay = new window.kakao.maps.CustomOverlay({
          position: new window.kakao.maps.LatLng(post.latitude, post.longitude),
          content: content,
        });
        customOverlay.setMap(map);
        return customOverlay;
      });

      setOverlays(newOverlays);
    }
  }, [data?.data?.content, map, clickedCategory, district]);

  // 전역 함수로 클릭시 상세보기 모달 띄움
  window.handlePostClick = (postId: number) => {
    const post = data.data.content.find((p: Post) => p.postId === postId);
    if (post) {
      setSelectedPost(post);
      setIsDetailPostModalOpen(true);
    }
  };

  // 현재 위치 마커로 찍기
  const getCurrentPosBtn = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const currentPos = new window.kakao.maps.LatLng(
          pos.coords.latitude,
          pos.coords.longitude,
        );
        map.panTo(currentPos);
        marker.setMap(null);
        marker.setPosition(currentPos);
        marker.setMap(map);
      },
      () => alert('위치 정보 가져오기 실패'),
      {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000,
      },
    );
  };

  return (
    <>
      <Layout>
        <MapContainer style={{ width, height }}>
          <MapBox id="map" style={{ width: '100%', height: '100%' }}></MapBox>
          <MyLocationBtn onClick={getCurrentPosBtn}>
            <MyLocationIcon />
          </MyLocationBtn>
        </MapContainer>
      </Layout>
      {isDetailPostModalOpen && (
        <DetailPostModal
          postId={selectedPost!.postId}
          setIsDetailPostModalOpen={setIsDetailPostModalOpen}
        />
      )}
    </>
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
