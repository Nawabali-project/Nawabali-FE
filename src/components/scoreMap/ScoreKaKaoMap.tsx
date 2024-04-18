/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import geojson from '../../utils/geojson.json';
import ReactDOM from 'react-dom';
import { getAreaScore } from '@/api/post';
import OverlayContent from './OverlayContent';

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
  const [areaData, setAreaData] = useState<any[]>([]);

  useEffect(() => {
    const fetchAreaData = async () => {
      const response = await getAreaScore();
      const sortedData = response.data
        .map((d: any) => ({
          ...d,
          score: d.totalPost * 10 + d.totalLocalLike,
        }))
        .sort((a: any, b: any) => b.score - a.score);
      setAreaData(sortedData);
    };

    fetchAreaData();
  }, []);

  useEffect(() => {
    const data: IFeature[] = geojson.features;

    const mapContainer = document.getElementById('pollution-map'),
      mapOption = {
        center: new kakao.maps.LatLng(37.535949, 127.00231),
        level: 8,
        scrollwheel: true,
        zoomable: false,
        draggable: true,
      };

    const map = new kakao.maps.Map(mapContainer, mapOption);
    const overlay = new kakao.maps.CustomOverlay({ map: map });

    const displayArea = (coordinates: number[][][], name: string) => {
      let path: any = [];
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
        fillOpacity: 1,
      });

      const districtData = areaData.find((d) => d.district === name);
      if (!districtData) return;

      const index = areaData.indexOf(districtData);
      let areaPowerColor = '';
      if (index < 5) {
        areaPowerColor = 'rgba(0, 163, 255, 0.9)';
      } else if (index >= 5 && index < 14) {
        areaPowerColor = 'rgba(0, 163, 255, 0.55)';
      } else {
        areaPowerColor = 'rgba(0, 163, 255, 0.3)';
      }

      polygon.setOptions({ fillColor: areaPowerColor });

      kakao.maps.event.addListener(polygon, 'mouseover', function () {
        polygon.setOptions({ strokeWeight: 20, strokeOpacity: 1 });
      });

      kakao.maps.event.addListener(polygon, 'mouseout', function () {
        polygon.setOptions({ strokeWeight: 2, strokeOpacity: 1 });
      });

      window.closeOverlay = () => {
        overlay.setMap(null);
      };

      kakao.maps.event.addListener(
        polygon,
        'click',
        function (mouseEvent: any) {
          const overlayElement = document.createElement('div');
          overlay.setContent(overlayElement);
          overlay.setPosition(mouseEvent.latLng);
          overlay.setMap(map);

          ReactDOM.render(
            <OverlayContent name={name} districtData={districtData} />,
            overlayElement,
          );
        },
      );
    };

    data.forEach((val) => {
      displayArea(val.geometry.coordinates, val.properties.SIG_KOR_NM);
    });
  }, [areaData]);

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
