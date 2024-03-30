import Header from '../common/header/Header';
import KakaoMap from '../common/kakao/KaKaoMap';
import styled from 'styled-components';

const Home = () => {
  return (
    <>
      <Header />
      <HomeLayout>
        <KakaoMap />
      </HomeLayout>
    </>
  );
};

const HomeLayout = styled.div`
  padding-top: 100px;
`;
export default Home;
