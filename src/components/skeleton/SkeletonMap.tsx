import styled, { keyframes } from 'styled-components';

const SkeletonMap = () => {
  return <Map />;
};

const wave = keyframes`
  0% {
    background-color: #d1d1d1;
  }

  50% {
    background-color: #e6e6e6;
  }

  100% {
    background-color: #d1d1d1;
  }
`;

const SkeletonPulse = styled.div`
  display: inline-block;
  width: 100%;
  height: 100%;
  animation: ${wave} 0.5s linear infinite;
`;

const Map = styled(SkeletonPulse)`
  width: 99%;
  height: 811px;
  border-radius: 25px;
`;

export default SkeletonMap;
