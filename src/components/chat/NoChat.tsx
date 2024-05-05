import styled from 'styled-components';
import { HiChatAlt2 } from 'react-icons/hi';

function NoChat() {
  return (
    <div>
      <ChatContainer>
        <HiChatAlt2 style={{ fontSize: '50px' }} />
        <span
          style={{
            fontSize: '25px',
            fontWeight: '800',
            color: 'black',
            margin: '10px 0',
          }}
        >
          채팅 보내기
        </span>
        <span>채팅으로 동네주민과 교류해요!</span>
      </ChatContainer>
    </div>
  );
}

export default NoChat;

const ChatContainer = styled.div`
  margin-top: 100px;
  margin-left: 20px;
  height: 700px;
  width: 60vw;
  overflow: hidden;
  background-color: white;
  border-radius: 20px;
  color: #757575;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
