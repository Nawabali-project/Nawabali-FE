import MainLayout from '@/components/mainLayout/MainLayout';
import styled from 'styled-components';

const Main = () => {
  return (
    <Layout>
      <MainLayout />
    </Layout>
  );
};

const Layout = styled.div`
  padding-top: 61.25px;
`;

export default Main;
