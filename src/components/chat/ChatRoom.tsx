import React, { useState, useEffect, useRef } from 'react';
import { Client, Message } from '@stomp/stompjs';
import { searchUserByNickname, sendMessage, showChat } from '@/api/chat';
import { Cookies } from 'react-cookie';
import {
  MessageType,
  ReturnedMessageForm,
  User,
} from '@/interfaces/chat/chat.interface';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import useSSEStore from '@/store/SSEState';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
export const ChatRoom: React.FC<{
  roomId: number;
  roomName: string;
  client: Client | null;
  isRoomActive: boolean;
}> = ({ roomId, roomName, client }) => {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<ReturnedMessageForm[]>([]);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [isComposing, setIsComposing] = useState(false);
  const accessToken = new Cookies().get('accessToken');
  const myNickname = localStorage.getItem('nickname');
  const chatEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const setHasChanges = useSSEStore((state) => state.setHasChanges);
  const { ref, inView } = useInView();

  const { data, status, error, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['scrollMessages', roomId],
    queryFn: ({ pageParam = 0 }) =>
      showChat({
        pageParam,
        roomId,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage.last) {
        return lastPage.pageable.pageNumber + 1;
      }
      return undefined;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const user = await searchUserByNickname(roomName);
        setUserInfo(user?.length > 0 ? user[0] : null);
      } catch (error) {
        console.error('Failed to fetch user info', error);
      }
    };

    if (roomName) {
      fetchUserInfo();
    }
  }, [roomName]);

  useEffect(() => {
    if (roomId && client?.connected) {
      const headers = { Authorization: `Bearer ${accessToken}` };
      const subscription = client.subscribe(
        `/sub/chat/room/${roomId}`,
        (message: Message) => {
          const receivedMessage: ReturnedMessageForm = {
            ...JSON.parse(message.body),
            createdMessageAt: new Date(
              JSON.parse(message.body).createdMessageAt,
            ),
          };
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
          setHasChanges(true);
        },
        headers,
      );
      return () => subscription.unsubscribe();
    }
  }, [roomId, client?.connected, accessToken, setHasChanges]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isComposing) {
      e.preventDefault();
      e.stopPropagation();
      handleSendMessage();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = () => {
    setIsComposing(false);
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    console.log('Sending message:', message);

    const chatMessage = {
      type: MessageType.TALK,
      message,
      sender: myNickname!,
      userId: parseInt(localStorage.getItem('userId') || '0', 10),
    };

    sendMessage(roomId, client, chatMessage)
      .then(() => {
        setMessage('');
      })
      .catch((error) => {
        console.error('Failed to send message:', error);
      });
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

  if (status === 'pending') {
    return <div>로딩중...</div>;
  }
  if (status === 'error') {
    return <div>Error: {error.message}</div>;
  }

  return (
    <ChatContainer>
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
          {data &&
            data.pages.map((page: any, pageIndex) => {
              console.log('page:', page);
              return page.content.map((msg: any, index: number) => {
                console.log('message:', msg);
                return msg.sender === myNickname ? (
                  <Row
                    ref={pageIndex === data.pages.length - 1 ? ref : null}
                    key={index}
                    style={{ alignSelf: 'flex-end', minWidth: '290px' }}
                  >
                    <ProfileImg
                      src={
                        localStorage.getItem('profileImageUrl')?.split('"')[1]
                      }
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
                  <Row
                    ref={pageIndex === data.pages.length - 1 ? ref : null}
                    key={index}
                    style={{ alignSelf: 'flex-start', minWidth: '290px' }}
                  >
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
                );
              });
            })}
        </Chat>

        <div ref={chatEndRef} />
      </>

      <InputDiv>
        <input
          value={message}
          type="text"
          placeholder="메시지 입력 ..."
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
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
  height: 70vh;
  min-width: 300px;
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
  height: 65%;
  min-width: 290px;
  width: 57.5vw;
  margin-top: 10px;
  overflow-y: auto;
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
  min-width: 300px;
  max-width: 500px;
  width: 25vw;
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
  min-width: 300px;
  max-width: 500px;
  width: 25vw;
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
