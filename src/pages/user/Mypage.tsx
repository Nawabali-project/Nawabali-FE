import styled from 'styled-components';
// import SearchBar from '@/common/header/SearchBar';
import { IoIosSearch } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
import SideBar from './SideBar';
const profileImg = '/assets/images/basicImg.png';

const Mypage = () => {
  return (
    <div style={{ marginTop: '100px' }}>
      <MypageContainer>
        <SideBar />
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
          <div>
            <span>
              회원 탈퇴하기
              <IoIosArrowForward />
            </span>
            <button>수정완료</button>
          </div>
        </ColumnFlexDiv>
      </MypageContainer>
    </div>
  );
};

export default Mypage;

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
