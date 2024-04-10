import styled from 'styled-components';
import { Districts } from '../../utils/districts';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';
import { IoIosSearch } from 'react-icons/io';
import SideBar from './SideBar';
import Button from '@/components/button/Button';
import { useUserInfo } from '@/api/user';
import { useRef, useState } from 'react';
// import { useMutation } from '@tanstack/react-query';
const profileImg = '/assets/images/basicImg.png';

const EditUser = () => {
  const [searchDistrict, setSearchDistrict] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [results, setResults] = useState<string[]>([]);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { data, error } = useUserInfo();
  if (error) return <div>{error.message}</div>;
  console.log('useQuery data: ', data);

  const hanleChangePassword = () => {};
  const hanleChangeNickname = () => {};

  const handleResultClick = (selectedDistrict: string) => {
    setSearchDistrict(selectedDistrict);
    setSelectedDistrict(selectedDistrict);
    setResults([]);
  };

  const handleSearchDistrictChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newValue = e.target.value;
    setSearchDistrict(newValue);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      if (newValue.trim() !== '' && newValue !== selectedDistrict) {
        const filteredResults = Districts.filter((district) =>
          district.includes(newValue),
        );
        setResults(filteredResults);
      } else {
        setResults([]);
      }
    }, 500);
  };

  const showSearchResults =
    searchDistrict && !selectedDistrict && results.length > 0;

  return (
    <Container>
      <SideBar />
      <Col style={{ width: '700px' }}>
        <Col style={{ width: '500px', margin: '0 auto' }}>
          <Row>
            <Profile />
            <Col>
              <Col>
                <TitleSpan>아이디</TitleSpan>
                <span>{data?.email}</span>
              </Col>
              <Col>
                <TitleSpan>비밀번호</TitleSpan>
                <Row>
                  <span>********</span>
                  <Button
                    size="small"
                    color="light"
                    onClick={hanleChangePassword}
                  >
                    비밀번호 변경
                  </Button>
                </Row>
              </Col>
              <Col>
                <TitleSpan>닉네임</TitleSpan>
                <Row>
                  <span>{data?.nickname}</span>
                  <Button
                    size="small"
                    color="light"
                    onClick={hanleChangeNickname}
                  >
                    닉네임 변경
                  </Button>
                </Row>
              </Col>
            </Col>
          </Row>
          <div>
            <Col>
              <TitleSpan>동네 설정</TitleSpan>
              <Row>
                <FaMapMarkerAlt />
                <span>서울특별시 {data?.district}</span>
              </Row>
            </Col>
            <Col>
              <SearchDiv>
                <IoIosSearch style={{ color: 'gray' }} />
                <input
                  value={searchDistrict}
                  type="text"
                  placeholder="지역구 검색 또는 아래에서 선택해주세요"
                  onChange={handleSearchDistrictChange}
                />
              </SearchDiv>
              {showSearchResults && (
                <div>
                  {results.map((result, index) => (
                    <div key={index} onClick={() => handleResultClick(result)}>
                      {result}
                    </div>
                  ))}
                </div>
              )}
            </Col>
          </div>
          <div>
            <span>
              회원 탈퇴하기
              <IoIosArrowForward />
            </span>
            <Button size="large" color="dark">
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

const SearchDiv = styled.div`
  border: 1px solid gray;
  border-radius: 15px;
  height: 30px;
  width: 90%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 10px;

  input {
    width: 90%;
    border: none;
    font-size: 13px;
    &:focus {
      outline: none;
    }
  }
`;
