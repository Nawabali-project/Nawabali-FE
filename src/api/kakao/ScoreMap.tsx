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
      center: new kakao.maps.LatLng(37.555949, 127.00231),
      level: 8,
      scrollwheel: false,
      draggable: true,
    };

    let map = new kakao.maps.Map(mapContainer, mapOption),
      customOverlay = new kakao.maps.CustomOverlay({}),
      infowindow = new kakao.maps.InfoWindow({ removable: true });

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
        strokeColor: '#004c80',
        strokeOpacity: 0.8,
        strokeStyle: 'solid',
        fillColor: '#fff',
        fillOpacity: 0.7,
      });

      polygons.push(polygon);

      // 마우스가 지역 위에 있을 때 지역에 색이 채워짐
      kakao.maps.event.addListener(polygon, 'mouseover', function () {
        polygon.setOptions({ fillColor: '#09f' });
        customOverlay.setContent('<div class="area">' + name + '</div>');
      });

      // 마우스가 지역 밖으로 나갔을 때 채워진 색이 원상복구
      kakao.maps.event.addListener(polygon, 'mouseout', function () {
        polygon.setOptions({ fillColor: '#fff' });
      });

      // 다각형에 click 이벤트를 등록하고 이벤트가 발생하면 다각형의 이름과 면적을 인포윈도우에 표시합니다
      kakao.maps.event.addListener(
        polygon,
        'click',
        function (mouseEvent: any) {
          let content =
            '<div class="info">' +
            '   <div class="title">' +
            name +
            '</div>' +
            '   <div class="size">총 면적 : 약 ' +
            Math.floor(polygon.getArea()) + // 이 부분에 우리 동네 점수 넣기
            ' m<sup>2</sup></div>' +
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
    <div id="pollution-map" style={{ width: '100%', height: '800px' }}></div>
  );
};

export default ScoreMap;
