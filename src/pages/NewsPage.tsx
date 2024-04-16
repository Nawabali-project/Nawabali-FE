import { GlobalIcon, MapIcon, ListIcon, StarBlackIcon } from '@/utils/icons';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import News from '@/components/news/News';

const NewsPage = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <CategoryBox>
        <ThreeComponentBox>
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
        </ThreeComponentBox>
      </CategoryBox>
      <News />
    </Layout>
  );
};

const Layout = styled.div`
  padding-top: 61.25px;
`;

const CategoryBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  height: 50px;
`;

const ThreeComponentBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
