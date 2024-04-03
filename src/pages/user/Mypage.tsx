import styled from 'styled-components';
import SideBar from './SideBar';
const profileImg = '/assets/images/basicImg.png';

const Mypage = () => {
  return (
    <Container>
      <SideBar />
      <Col style={{ width: '700px' }}>
        <Col style={{ width: '500px', margin: '0 auto' }}>
          <Col>
            <Row style={{ alignItems: 'center' }}>
              <Profile />
              <Col>
                <Row>
                  <TitleSpan>소갈비찜</TitleSpan>
                  <span>서교동</span>
                  <span>. 토박이</span>
                </Row>
                <span>abcd@gmail.com</span>
              </Col>
            </Row>
          </Col>
          <div
            style={{
              borderTop: '1px solid grey',
              borderBottom: '1px solid grey',
              height: '50px',
              margin: '10px 0',
              display: 'flex',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}
          >
            <span>게시물</span>
            <span>마이플레이스</span>
          </div>
          <Row
            style={{
              flexWrap: 'wrap',
              justifyContent: 'center',
              margin: '0 auto',
            }}
          >
            <Contents />
            <Contents />
            <Contents />
            <Contents />
            <Contents />
            <Contents />
            <Contents />
            <Contents />
            <Contents />
          </Row>
        </Col>
      </Col>
    </Container>
  );
};

export default Mypage;

const Container = styled.div`
  width: 1000px;
  margin: 100px auto 0;
  justify-content: center;
  display: flex;
  border: 1px solid pink;
`;

const Row = styled.div`
  display: flex;
  border-radius: 10px;
  /* border: 1px solid blue; */
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  /* border: 1px solid red; */
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

const Contents = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 10px;
  margin: 8px;
  background-color: lightgrey;
`;
