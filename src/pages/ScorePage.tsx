import { MapIcon, ListIcon, GlobalBlackIcon, StarIcon } from '@/utils/icons';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Score from '@/components/scoreMap/ScoreMap';
import { BottomArrowIcon } from '@/utils/icons';

const ScorePage = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <CategoryBox>
        <InfoBox>
          동네별 활동점수란?&nbsp;
          <BottomArrowIcon />
        </InfoBox>
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
      </CategoryBox>
      <Score />
    </Layout>
  );
};

const InfoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  font-weight: bold;
  cursor: pointer;
`;

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

export default ScorePage;
