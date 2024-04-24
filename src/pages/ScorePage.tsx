import { MapIcon, ListIcon, GlobalBlackIcon, StarIcon } from '@/utils/icons';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Score from '@/components/scoreMap/ScoreMap';

const ScorePage = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <CategoryBox>
        <SecondHeader>
          <ThreeComponentBox>
            <FourCategory onClick={() => navigate('/')}>
              <MapIcon />
              &nbsp;지도
            </FourCategory>
            <FourCategory onClick={() => navigate('/listpage')}>
              <ListIcon />
              &nbsp;리스트
            </FourCategory>
            <FourCategory>
              <GlobalBlackIcon />
              <SelectedPageComment>&nbsp;동네별 활동점수</SelectedPageComment>
            </FourCategory>
            <FourCategory onClick={() => navigate('/newspage')}>
              <StarIcon />
              &nbsp;동네소식
            </FourCategory>
          </ThreeComponentBox>
        </SecondHeader>
      </CategoryBox>
      <Score />
    </Layout>
  );
};

const Layout = styled.div`
  padding-top: 111px;
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
  z-index: 9;
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

export default ScorePage;
