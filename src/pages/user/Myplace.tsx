import styled from 'styled-components';
// import SearchBar from '@/common/header/SearchBar';
import { IoIosSearch } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
const profileImg = '/assets/images/basicImg.png';

const Myplace = () => {
  return (
    <div style={{ marginTop: '100px' }}>
      <RowFlexDiv
        style={{ width: '1000px', margin: '0 auto', justifyContent: 'center' }}
      >
        <SideBarDiv>
          <div>
            <p>내 프로필 관리</p>
            <p>게시물 관리</p>
            <p>프로필 관리</p>
          </div>
          <div>
            <p>마이 플레이스</p>
            <p>플레이스 저장</p>
          </div>
          <div>
            <p>방문한 플레이스</p>
          </div>
        </SideBarDiv>
        <ColumnFlexDiv style={{ width: '700px' }}>
          <RowFlexDiv>
            <Profile />
            <ColumnFlexDiv>
              <ColumnFlexDiv>
                <TitleSpan>사용자 닉네임</TitleSpan>
                <UserInput value="소갈비찜" />
              </ColumnFlexDiv>
              <ColumnFlexDiv>
                <TitleSpan>이메일</TitleSpan>
                <UserInput value="abcd@gmail.com" />
              </ColumnFlexDiv>
            </ColumnFlexDiv>
          </RowFlexDiv>
          <div>
            <TitleSpan>동네 설정</TitleSpan>
            <span style={{ fontSize: '11px', color: 'gray' }}>
              소갈비님은 현재 서초구 주민입니다!
            </span>
            <div>
              <SearchDiv>
                <IoIosSearch style={{ color: 'gray' }} />
                <input
                  value=""
                  type="text"
                  placeholder="이사갈 동네를 검색해주세요!"
                />
              </SearchDiv>
              {/* <SearchBar address="address" $isOpen={true} /> */}
            </div>
          </div>
          <div>
            <TitleSpan style={{ display: 'block' }}>내 등급 확인하기</TitleSpan>
            <span style={{ fontSize: '13px' }}>
              소갈비찜님의 현재 등급은 토박이 입니다!
            </span>
          </div>
          <hr /> <br /> <br />
          <div>
            <span>
              회원 탈퇴하기
              <IoIosArrowForward />
            </span>
            <button>수정완료</button>
          </div>
        </ColumnFlexDiv>
      </RowFlexDiv>
    </div>
  );
};

export default Myplace;

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

const TitleSpan = styled.span`
  font-weight: 600;
  font-size: 15px;
  margin-right: 10px;
`;

const UserInput = styled.input`
  border: 1px solid gray;
  border-radius: 10px;
  height: 30px;
  width: 350px;
`;

const SearchDiv = styled.div`
  border: 1px solid gray;
  border-radius: 10px;
  height: 30px;
  width: 400px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 10px;

  input {
    width: 230px;
    border: none;
    font-size: 13px;
    &:focus {
      outline: none;
    }
  }
`;
