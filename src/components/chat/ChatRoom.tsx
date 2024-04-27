import React, { useState, useEffect, useRef } from 'react';
import { Client, Message } from '@stomp/stompjs';
import { searchUserByNickname, showChat } from '@/api/chat';
import { Cookies } from 'react-cookie';
import {
  MessageForm,
  MessageType,
  ReturnedMessageForm,
  User,
} from '@/interfaces/chat/chat.interface';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
export const ChatRoom: React.FC<{
  roomId: number;
  roomName: string;
  client: Client | null;
}> = ({ roomId, roomName, client }) => {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<ReturnedMessageForm[]>([]);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const accessToken = new Cookies().get('accessToken');
  const myNickname = localStorage.getItem('nickname');
  const chatEndRef = useRef<HTMLDivElement>(null);
  const stompClient = client;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const user = await searchUserByNickname(roomName);
        if (user && user.length > 0) {
          setUserInfo(user[0]);
          console.log('user: ', user);
        } else {
          setUserInfo(null);
        }
      } catch (error) {
        console.error('Failed to fetch user info', error);
      }
    };

    if (roomName) {
      fetchUserInfo();
    }
  }, [roomName]);

  useEffect(() => {
    if (roomId && client) {
      if (!client.connected) {
        console.error('WebSocket connection is not active.');
        return;
      }
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      client.subscribe(
        `/sub/chat/room/${roomId}`,
        (message: Message) => {
          try {
            const parsedMessage = JSON.parse(message.body);
            const receivedMessage: ReturnedMessageForm = {
              ...parsedMessage,
              createdMessageAt: new Date(parsedMessage.createdMessageAt),
            };
            setMessages((prevMessages) => [...prevMessages, receivedMessage]);
          } catch (error) {
            console.error('Failed to parse message:', message.body, error);
          }
        },
        headers,
      );
    }
  }, [roomId, client, accessToken]);

  useEffect(() => {
    setIsLoading(true);
    const fetchMessages = async () => {
      try {
        const fetchedMessages = await showChat(roomId);
        if (fetchedMessages && fetchedMessages.length > 0) {
          const sortedMessages = fetchedMessages.sort(
            (a: ReturnedMessageForm, b: ReturnedMessageForm) =>
              new Date(a.createdMessageAt).getTime() -
              new Date(b.createdMessageAt).getTime(),
          );
          setMessages(sortedMessages);
        } else {
          setMessages([]);
          console.error('메시지가 없습니다.');
        }
      } catch (error) {
        console.error('메시지를 불러오는데 실패했습니다', error);
        setMessages([]);
      }
      setIsLoading(false);
    };

    if (roomId) {
      fetchMessages();
    }
  }, [roomId]);

  useEffect(() => {
    const scrollToBottom = () => {
      const chatDiv = chatEndRef.current?.parentElement as HTMLElement | null;
      if (chatDiv) {
        chatDiv.scrollTop = chatDiv.scrollHeight;
      }
    };

    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    if (!stompClient?.connected) {
      console.error('WebSocket connection is not active.');
      return;
    }

    const chatMessage: MessageForm = {
      type: MessageType.TALK,
      message,
      sender: localStorage.getItem('nickname')!,
      userId: parseInt(localStorage.getItem('userId')!),
    };

    stompClient.publish({
      destination: `/pub/chat/message/${roomId}`,
      headers: { Authorization: `Bearer ${accessToken}` },
      body: JSON.stringify(chatMessage),
    });

    setMessage('');
  };

  const goToUserProfile = (userNick: string) => {
    navigate(`/userProfile/${userNick}`);
  };

  function formatMessageDate(dateString: string) {
    const d = new Date(dateString);
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    const dayOfWeek = weekdays[d.getDay()];
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    const hour = d.getHours().toString().padStart(2, '0');
    const minute = d.getMinutes().toString().padStart(2, '0');
    return `${month}.${day}(${dayOfWeek}) ${hour}:${minute}`;
  }

  return (
    <ChatContainer>
      {isLoading ? (
        <div>로딩 중...</div>
      ) : (
        <>
          {roomName && userInfo && (
            <UserInfo>
              <UserProfileImg
                src={userInfo?.imgUrl}
                alt={`${roomName}의 프로필`}
                onClick={() => goToUserProfile(roomName)}
              />
              <h3>{roomName}</h3>
            </UserInfo>
          )}
          <Chat>
            {messages.map((msg, index) =>
              msg.sender === myNickname ? (
                <Row key={index} style={{ alignSelf: 'flex-end' }}>
                  <ProfileImg
                    src={localStorage.getItem('profileImageUrl')?.split('"')[1]}
                    alt="내 프로필"
                  />
                  <MyMessage>
                    <span>{msg.message}</span>
                    <div
                      style={{
                        fontSize: '12px',
                        color: '#dfdfdf',
                        width: '50px',
                      }}
                    >
                      {formatMessageDate(msg.createdMessageAt)}
                    </div>
                  </MyMessage>
                </Row>
              ) : (
                <Row key={index} style={{ alignSelf: 'flex-start' }}>
                  <ProfileImg src={userInfo?.imgUrl} alt={`상대방 프로필`} />
                  <OtherMessage>
                    {msg.message}
                    <div
                      style={{
                        fontSize: '12px',
                        color: '#3f3f3f',
                        width: '50px',
                      }}
                    >
                      {formatMessageDate(msg.createdMessageAt)}
                    </div>
                  </OtherMessage>
                </Row>
              ),
            )}
            <div ref={chatEndRef} />
          </Chat>
        </>
      )}

      <InputDiv>
        <input
          value={message}
          type="text"
          placeholder="메시지 입력 ..."
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage();
              e.preventDefault();
            }
          }}
        />
      </InputDiv>
    </ChatContainer>
  );
};

export default ChatRoom;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const ChatContainer = styled.div`
  margin-top: 100px;
  margin-left: 20px;
  height: 760px;
  width: 60vw;
  background-color: white;
  border-radius: 20px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding-left: 20px;
  height: 100px;
  border-bottom: 1px solid #cccccc;
`;

const Chat = styled.div`
  display: flex;
  flex-direction: column;
  height: 550px;
  margin-top: 10px;
  overflow: auto;
  padding: 0 20px 20px;

  &::-webkit-scrollbar {
    width: 8px;
    height: 15px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(124, 124, 124, 0.3);
    border-radius: 6px;
  }
`;

const MyMessage = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  width: 300px;
  background-color: #00a3ff;
  padding: 5px;
  color: white;
  border-radius: 8px;
  margin: 3px 0;
`;

const OtherMessage = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  width: 300px;
  background-color: #f0f0f0;
  padding: 5px;
  border-radius: 8px;
  margin: 3px 0;
`;

const InputDiv = styled.div`
  width: 90%;
  height: 30px;
  border: 1px solid #cccccc;
  border-radius: 15px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 10px;
  margin: 30px auto 10px;

  input {
    width: 100%;
    border: none;
    font-size: 13px;
    &:focus {
      outline: none;
    }
  }

  input::placeholder {
    color: #cccccc;
  }
`;

const UserProfileImg = styled.img`
  width: 70px;
  height: 70px;
  border: 1px solid #d9d9d9;
  background-size: cover;
  border-radius: 50%;
  margin-right: 10px;
  cursor: pointer;
`;

const ProfileImg = styled.img`
  width: 30px;
  height: 30px;
  border: 1px solid #d9d9d9;
  background-size: cover;
  border-radius: 50%;
  margin-right: 10px;
`;
