import { FaCheckCircle } from 'react-icons/fa';
import Contents from './Contents';
import styled from 'styled-components';
const profileImg = '/assets/images/basicImg.png';
const Mypage = () => {
  return (
    <div style={{ marginTop: '100px' }}>
      <RowFlexDiv>
        <SideBarDiv>
          <div>
            <p>내 프로필 관리</p>
            <p>게시물 관리</p>
            <p>프로필 관리</p>
          </div>
          <div>
            <p>마이 플레이스</p>
            <p>플레이스 관리</p>
          </div>
          <div>
            <p>로그아웃</p>
          </div>
        </SideBarDiv>
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
          <hr /> <br /> <br />
          <Contents />
        </ColumnFlexDiv>
      </RowFlexDiv>
    </div>
  );
};

export default Mypage;

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

const SideBarDiv = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  width: 160px;
  height: 500px;
  padding: 20px;
  margin: 0 20px;
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
