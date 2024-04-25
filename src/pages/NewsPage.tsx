import { GlobalIcon, MapIcon, ListIcon, StarBlackIcon } from '@/utils/icons';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import News from '@/components/news/News';

const NewsPage = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <CategoryBox>
        <SecondHeader>
          <FourComponentBox>
            <FourCategory onClick={() => navigate('/')}>
              <MapIcon />
              &nbsp;지도
            </FourCategory>
            <FourCategory onClick={() => navigate('/listpage')}>
              <ListIcon />
              &nbsp;리스트
            </FourCategory>
            <FourCategory onClick={() => navigate('/scorepage')}>
              <GlobalIcon /> &nbsp;동네별 활동점수
            </FourCategory>
            <FourCategory>
              <StarBlackIcon />
              <SelectedPageComment>&nbsp;동네소식</SelectedPageComment>
            </FourCategory>
          </FourComponentBox>
        </SecondHeader>
      </CategoryBox>
      <News />
    </Layout>
  );
};

const Layout = styled.div`
  padding-top: 120px;
`;

const SecondHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 1280px;
`;

const CategoryBox = styled.div`
  position: fixed;
  top: 61.25px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-evenly;
  background-color: white;
  height: 65px;
  border-bottom: 1px solid #d9d9d9;
  z-index: 9;
`;

const FourComponentBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 392px;
  cursor: pointer;
`;

const FourCategory = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
  color: #a1a1a1;
  font-weight: bold;
  cursor: pointer;
`;

const SelectedPageComment = styled.div`
  color: black;
`;

export default NewsPage;
