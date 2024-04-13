/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import geojson from '../../utils/geojson.json';
import ScoreCircle from './ScoreCircle';

const { kakao } = window;

declare global {
  interface Window {
    kakao: any;
    closeOverlay?: () => void;
  }
}

interface IFeature {
  geometry: {
    coordinates: number[][][];
  };
  properties: {
    SIG_KOR_NM: string;
  };
}

const ScoreMap: React.FC = () => {
  const areaScore = ScoreCircle();
  console.log('Area Score', areaScore);

  useEffect(() => {
    const data: IFeature[] = geojson.features;
    let coordinates: number[][][] = [];
    let name: string = '';

    const mapContainer = document.getElementById('pollution-map'),
      mapOption = {
        center: new kakao.maps.LatLng(37.565949, 127.00231),
        level: 8,
        scrollwheel: false,
        zoomable: false,
        draggable: false,
      };

    let map = new kakao.maps.Map(mapContainer, mapOption);
    let overlay = new kakao.maps.CustomOverlay({
      map: map,
    });

    const displayArea = (coordinates: number[][][], name: string) => {
      let path: any = [];

      // 모든 좌표를 순회하면서 경로와 총합을 계산
      coordinates[0].forEach((coordinate) => {
        let latLng = new kakao.maps.LatLng(coordinate[1], coordinate[0]);
        path.push(latLng);
      });

      let polygon = new kakao.maps.Polygon({
        map: map,
        path: path,
        strokeWeight: 2,
        strokeColor: 'white',
        strokeOpacity: 0.8,
        strokeStyle: 'solid',
        fillColor: 'white',
        fillOpacity: 0.7,
      });

      // 점수별 지역 색 정하기
      const areaPower = Math.floor(polygon.getArea());
      let areaPowerColor = '';
      if (areaPower < 15000000) {
        areaPowerColor = '#abe9ff';
      } else if (areaPower >= 15000000 && areaPower < 17000000) {
        areaPowerColor = '#5cd3ff';
      } else if (areaPower >= 17000000 && areaPower < 20000000) {
        areaPowerColor = '#00bbff';
      } else if (areaPower >= 20000000 && areaPower < 23000000) {
        areaPowerColor = '#2a7cff';
      } else if (areaPower >= 23000000 && areaPower < 26000000) {
        areaPowerColor = '#0062ff';
      } else if (areaPower >= 26000000 && areaPower < 29000000) {
        areaPowerColor = '#0011ff';
      } else if (areaPower >= 29000000) {
        areaPowerColor = '#0011ff';
      }

      // 점수별로 지역 색 업데이트
      polygon.setOptions({ fillColor: areaPowerColor });

      kakao.maps.event.addListener(polygon, 'mouseover', function () {
        polygon.setOptions({ strokeWeight: 10, fillOpacity: 0.8 });
      });

      kakao.maps.event.addListener(polygon, 'mouseout', function () {
        polygon.setOptions({ strokeWeight: 2, fillOpacity: 0.7 });
      });

      window.closeOverlay = () => {
        overlay.setMap(null);
      };

      let content = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 300px; height: 300px; background-color: white; border-radius: 150px; z-index: 200;">
          <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <div style="display: flex; align-items: center; justify-content: center; margin-top: 10px">
            ${name}
            </div>
            <div style="display: flex; align-items: center; justify-content: center; font-size: 70px; font-weight: 900;">
              524
            </div>
            <div style="display: flex; align-items: center; justify-content: center; margin: 10px; color: gray; font-size: 13px;">
              맛집 250개 + 카페 249개 + 사진스팟 79개
            </div>
            <div style="display: flex; align-items: center; justify-content: center; margin: 5px; padding-bottom: 10px;">
              ${name} 맛집 동네예요 :)
            </div>
            <button onclick="window.closeOverlay()" style="margin: 5px 0px; padding: 5px 10px; border: none; background-color: #f55; color: white; border-radius: 5px; cursor: pointer;">닫기</button>
          </div>
        </div>
      `;

      // 지역 클릭시 커스텀 오버레이를 표시
      kakao.maps.event.addListener(
        polygon,
        'click',
        function (mouseEvent: any) {
          overlay.setContent(content);
          overlay.setPosition(mouseEvent.latLng);
          overlay.setMap(map);
        },
      );
    };

    data.forEach((val) => {
      coordinates = val.geometry.coordinates;
      name = val.properties.SIG_KOR_NM;

      displayArea(coordinates, name);
    });
  }, []);

  return (
    <div id="pollution-map">
      <div
        className="map-content"
        style={{ width: '100%', height: '1000px' }}
      ></div>
    </div>
  );
};

export default ScoreMap;
