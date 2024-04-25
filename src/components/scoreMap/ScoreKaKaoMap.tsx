/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import geojson from '../../utils/geojson.json';
import ReactDOM from 'react-dom/client';
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
        strokeWeight: 4,
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
      let areaOpacity = '';
      if (index < 5) {
        areaPowerColor = '#40b9ff';
        areaOpacity = '0.85';
      } else if (index >= 5 && index < 14) {
        areaPowerColor = '#89d4ff';
        areaOpacity = '0.75';
      } else {
        areaPowerColor = '#d4f1ff';
        areaOpacity = '0.75';
      }

      polygon.setOptions({
        fillColor: areaPowerColor,
        fillOpacity: areaOpacity,
      });

      kakao.maps.event.addListener(polygon, 'mouseover', function () {
        polygon.setOptions({
          strokeWeight: 20,
          strokeOpacity: 1,
        });
      });

      kakao.maps.event.addListener(polygon, 'mouseout', function () {
        polygon.setOptions({
          strokeWeight: 4,
          strokeOpacity: 1,
        });
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

          const overlayRoot = ReactDOM.createRoot(overlayElement);
          overlayRoot.render(
            <OverlayContent name={name} districtData={districtData} />,
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
