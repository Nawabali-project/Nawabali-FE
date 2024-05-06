import styled from 'styled-components';

const SkeletonMap = () => {
  return (
    <LoadingContainer>
      <img src="/assets/images/mapLoadingCar.gif" alt="로딩 중" />
    </LoadingContainer>
  );
};

const LoadingContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 99.5%;
  height: 821px;
  background-color: white;
  z-index: 100;
`;

export default SkeletonMap;
