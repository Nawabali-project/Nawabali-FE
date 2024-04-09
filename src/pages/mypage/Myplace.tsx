import { FaCheckCircle } from 'react-icons/fa';
import Contents from './MyContents';
import styled from 'styled-components';
import SideBar from './SideBar';
const profileImg = '/assets/images/basicImg.png';
const Myplace = () => {
  return (
    <div style={{ marginTop: '100px' }}>
      <MypageContainer>
        <SideBar />
        <ColumnFlexDiv>
          <RowFlexDiv>
            <Profile />
            <div>
              <RowFlexDiv>
                <p>소갈비찜</p>
                <p>
                  <FaCheckCircle />
                  서초구 토박이
                </p>
              </RowFlexDiv>
              <div>프로필 편집</div>
              <RowFlexDiv>
                <span>게시물</span>
                <span>팔로워</span>
                <span>팔로우</span>
              </RowFlexDiv>
            </div>
          </RowFlexDiv>
          <Contents />
        </ColumnFlexDiv>
      </MypageContainer>
    </div>
  );
};

export default Myplace;

const MypageContainer = styled.div`
  width: 1000px;
  margin: 0 auto;
  justify-content: center;
  display: flex;
  border: 1px solid pink;
`;

const RowFlexDiv = styled.div`
  display: flex;
  border: 1px solid blue;
  border-radius: 10px;
`;

const ColumnFlexDiv = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  border: 1px solid red;
`;

const Profile = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-size: cover;
  cursor: pointer;
  margin: 0 8px;
  background-image: url(${profileImg});
`;
