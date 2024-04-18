import ScoreMap from '@/components/scoreMap/ScoreKaKaoMap';
import styled from 'styled-components';

const Score = () => {
  return (
    <MapContainer>
      <div className="map-content">
        <ScoreMap />
      </div>
    </MapContainer>
  );
};

const MapContainer = styled.div`
  width: 100%;
  height: 815px;
  overflow: hidden;
  margin-top: 5px;

  /* .map-content {
    transform: scale(0.815);
    transform-origin: top center;
  } */
`;

export default Score;
