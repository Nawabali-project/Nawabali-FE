import { FaCheckCircle } from 'react-icons/fa';
import Contents from './Contents';
import Myplace from './Myplace';
import styled from 'styled-components';

const Mypage = () => {
  const basicImg = '/assets/images/basicImg.png';
  return (
    <>
      <RowFlexDiv>
        <ColumnFlexDiv>
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
        </ColumnFlexDiv>
        <ColumnFlexDiv>
          <RowFlexDiv>
            <img src={basicImg}></img>
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
          <Myplace />
        </ColumnFlexDiv>
      </RowFlexDiv>
    </>
  );
};

export default Mypage;

const RowFlexDiv = styled.div`
  display: flex;
  border: 1px solid blue;
`;

const ColumnFlexDiv = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid red;
`;
