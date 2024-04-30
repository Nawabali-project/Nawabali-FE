import styled from 'styled-components';

const SkeletonMap = () => {
  return (
    <LoadingContainer>
      <img src="/assets/images/mapLoading.gif" alt="로딩 중" />
    </LoadingContainer>
  );
};

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

export default SkeletonMap;
