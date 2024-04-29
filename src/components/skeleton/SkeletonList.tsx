import styled from 'styled-components';

const SkeletonList = () => {
  return (
    <Feed>
      <HeaderBox />
      <ImgBox />
      <FootBox />
    </Feed>
  );
};

const Feed = styled.div`
  width: 294.984px;
  height: 420.914px;
`;

const HeaderBox = styled.div``;

const ImgBox = styled.div``;

const FootBox = styled.div``;

export default SkeletonList;
