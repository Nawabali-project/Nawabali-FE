/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import geojson from '../../utils/regex/geojson.json';
const { kakao } = window;

declare global {
  interface Window {
    kakao: any;
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
  useEffect(() => {
    const data: IFeature[] = geojson.features;
    let coordinates: number[][][] = [];
    let name: string = '';

    let polygons: kakao.maps.Polygon[] = [];

    const mapContainer = document.getElementById('pollution-map');

    if (!mapContainer) return;

    const mapOption: kakao.maps.MapOptions = {
      center: new kakao.maps.LatLng(37.565949, 127.00231),
      level: 9,
      scrollwheel: false,
    };

    let map = new kakao.maps.Map(mapContainer, mapOption);
    let infowindow = new kakao.maps.InfoWindow({ removable: true });

    const displayArea = (coordinates: number[][][], name: string) => {
      let path: kakao.maps.LatLng[] = [];

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

      polygons.push(polygon);

      kakao.maps.event.addListener(polygon, 'mouseover', function () {
        polygon.setOptions({ strokeWeight: 10, fillOpacity: 0.8 });
      });

      kakao.maps.event.addListener(polygon, 'mouseout', function () {
        polygon.setOptions({ strokeWeight: 2, fillOpacity: 0.7 });
      });

      // 클릭하면 지역의 정보창
      kakao.maps.event.addListener(
        polygon,
        'click',
        function (mouseEvent: any) {
          let content =
            '<div class="info">' +
            '   <div class="title">' +
            name +
            '</div>' +
            '   <div class="size">총 점수 : ' +
            Math.floor(polygon.getArea()) + // 이 부분에 우리 동네 점수 넣기
            ' </div>' +
            '</div>';

          infowindow.setContent(content);
          infowindow.setPosition(mouseEvent.latLng);
          infowindow.setMap(map);
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
    <div id="pollution-map" style={{ width: '100%', height: '815px' }}></div>
  );
};

export default ScoreMap;
