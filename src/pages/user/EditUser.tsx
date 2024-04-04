import styled from 'styled-components';
// import SearchBar from '@/common/header/SearchBar';
import { IoIosArrowForward } from 'react-icons/io';
import SideBar from './SideBar';
import Button from '@/components/button/Button';
const profileImg = '/assets/images/basicImg.png';

const EditUser = () => {
  return (
    <Container>
      <SideBar />
      <Col style={{ width: '700px' }}>
        <Col style={{ width: '500px', margin: '0 auto' }}>
          <Row>
            <Profile />
            <Col>
              <Col>
                <TitleSpan>사용자 닉네임</TitleSpan>
                <input type="text" value="소갈비찜" />
              </Col>
              <Col>
                <TitleSpan>이메일</TitleSpan>
                <input type="email" value="abcd@gmail.com" />
              </Col>
            </Col>
          </Row>
          <div>
            <TitleSpan>동네 설정</TitleSpan>
            <span style={{ fontSize: '11px', color: 'gray' }}>
              소갈비님은 현재 서초구 주민입니다!
            </span>
            <div>
              <input
                value=""
                type="text"
                placeholder="이사갈 동네를 검색해주세요!"
              />
              {/* <SearchBar address="address" $isOpen={true} /> */}
            </div>
          </div>
          <div>
            <TitleSpan style={{ display: 'block' }}>내 등급 확인하기</TitleSpan>
            <span style={{ fontSize: '13px' }}>
              소갈비찜님의 현재 등급은 토박이 입니다!
            </span>
          </div>
          <div>
            <span>
              회원 탈퇴하기
              <IoIosArrowForward />
            </span>
            <Button size="small" color="normal">
              수정완료
            </Button>
          </div>
        </Col>
      </Col>
    </Container>
  );
};

export default EditUser;

const Container = styled.div`
  width: 1000px;
  margin: 100px auto 0;
  justify-content: center;
  display: flex;
  border: 1px solid pink;
`;

const Row = styled.div`
  display: flex;
  border: 1px solid blue;
  border-radius: 10px;
`;

const Col = styled.div`
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

const TitleSpan = styled.span`
  font-weight: 600;
  font-size: 15px;
  margin-right: 10px;
`;
