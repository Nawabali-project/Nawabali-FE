import {
  MapIcon,
  ListIcon,
  GlobalBlackIcon,
  StarIcon,
  TopArrowIcon,
} from '@/utils/icons';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Score from '@/components/scoreMap/ScoreMap';
import { BottomArrowIcon } from '@/utils/icons';
import { FaQuestion } from 'react-icons/fa';
import { useState } from 'react';

const ScorePage = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(true);
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  return (
    <Layout>
      <CategoryBox>
        <SecondHeader>
          <InfoBox onClick={toggleDropdown}>
            <FaQuestion color="red" />
            &nbsp; 동네별 활동점수가 무엇인가요? &nbsp;&nbsp;
            {showDropdown ? <TopArrowIcon /> : <BottomArrowIcon />}
            {showDropdown && (
              <DropdownInfo>
                <div>
                  <strong>총 게시물 수 + 주민추천 수</strong>
                  가 합산된 점수에요.
                  <br />
                  <span style={{ color: '#00A3FF' }}>
                    활동점수가 높은 동네일 수록 색상이 진하답니다 :)
                  </span>
                  <br />
                  <br />
                  <strong>우리동네 점수를 높이고 싶으신가요?</strong>
                  <br />
                  그렇다면 게시물을 자주 업로드 하고
                  <br />
                  우리동네 게시글에 주민추천을 많이 눌러주세요!
                </div>
              </DropdownInfo>
            )}
          </InfoBox>
          <FourComponentBox>
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
          </FourComponentBox>
        </SecondHeader>
      </CategoryBox>
      <Score />
    </Layout>
  );
};

const InfoBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  min-width: 245px;
  margin: 0 10px 0 20px;
  cursor: pointer;
`;

const DropdownInfo = styled.div`
  position: absolute;
  top: 60px;
  left: -40px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 10px 20px;
  background-color: #fff;
  border-radius: 20px;
  width: 300px;
  height: 180px;
  overflow-y: auto;
  z-index: 400;
  font-size: 14px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  line-height: 180%;
`;

const Layout = styled.div`
  padding-top: 111px;
`;

const SecondHeader = styled.div`
  display: flex;
  justify-content: space-between;
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

export default ScorePage;
