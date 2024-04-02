import SocialKaKao from '@/common/kakao/SocialKaKao';
import Header from '../common/header/Header';
import styled from 'styled-components';

const Home = () => {
  return (
    <>
      <Header />
      <HomeLayout>
        <SocialKaKao />
      </HomeLayout>
    </>
  );
};

const HomeLayout = styled.div`
  padding-top: 100px;
`;

export default Home;
