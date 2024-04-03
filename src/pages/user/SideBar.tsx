import styled from 'styled-components';

const SideBar = () => {
  return (
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
  );
};

export default SideBar;

const SideBarDiv = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  width: 160px;
  height: 500px;
  padding: 20px;
  border: 1px solid red;
`;
