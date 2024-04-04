import FeedsLayout from '@/components/mainPage/MainLayout';
import styled from 'styled-components';

const Main = () => {
  return (
    <Layout>
      <FeedsLayout />
    </Layout>
  );
};

const Layout = styled.div`
  padding-top: 61.25px;
`;

export default Main;
