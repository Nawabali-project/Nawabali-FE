import React, { useState, useEffect } from 'react';
import { Client, Message } from '@stomp/stompjs';
import { searchUserByNickname, sendMessage, showChat } from '@/api/chat';
import { Cookies } from 'react-cookie';
import {
  MessageProps,
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
  const navigate = useNavigate();
  const setHasChanges = useSSEStore((state) => state.setHasChanges);

  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['scrollMessages', roomId],
    queryFn: ({ pageParam = 0 }) => showChat({ pageParam, roomId }),
    getNextPageParam: (lastPage) =>
      lastPage.previousPageNumber >= 0
        ? lastPage.previousPageNumber
        : undefined,
    initialPageParam: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  useEffect(() => {
    if (data) {
      setMessages((prev) => [
        ...data.pages.flatMap((page) => page.content),
        ...prev,
      ]);
    }
  }, [data]);

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
  }, [roomId, client, accessToken]);

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

  const handleSendMessage = () => {
    if (!message.trim()) return;
    const chatMessage = {
      type: MessageType.TALK,
      message,
      sender: myNickname!,
      userId: parseInt(localStorage.getItem('userId') || '0', 10),
    };
    sendMessage(roomId, client, chatMessage)
      .then(() => setMessage(''))
      .catch((error) => console.error('Failed to send message:', error));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isComposing) {
      e.preventDefault();
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

  const formatMessageDate = (dateString: string) => {
    const d = new Date(dateString);
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const hour = d.getHours();
    const minute = d.getMinutes();

    const formattedMonth = month < 10 ? '0' + month : month;
    const formattedDay = day < 10 ? '0' + day : day;
    const formattedHour = hour < 10 ? '0' + hour : hour;
    const formattedMinute = minute < 10 ? '0' + minute : minute;
    return `${formattedMonth}.${formattedDay} ${formattedHour}:${formattedMinute}`;
  };

  return (
    <ChatContainer>
      {roomName && userInfo && (
        <UserInfo>
          <UserProfileImg
            src={userInfo?.imgUrl}
            alt={`${roomName}'s profile`}
            onClick={() => navigate(`/userProfile/${roomName}`)}
          />
          <h3>{roomName}</h3>
        </UserInfo>
      )}
      <Chat ref={ref}>
        {messages.map((msg, index) => (
          <MessageRow key={index} isMyMessage={msg.sender === myNickname}>
            <ProfileImg
              src={
                msg.sender === myNickname
                  ? localStorage.getItem('profileImageUrl')!.replace('"', '')
                  : userInfo?.imgUrl
              }
            />
            <MessageText isMyMessage={msg.sender === myNickname}>
              <MessageContent>{msg.message}</MessageContent>
              <MessageDate>
                {formatMessageDate(msg.createdMessageAt)}
              </MessageDate>
            </MessageText>
          </MessageRow>
        ))}
      </Chat>
      <InputDiv>
        <Input
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

const ChatContainer = styled.div`
  margin-top: 20px;
  height: 90vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background: white;
  border-bottom: 1px solid #ccc;
`;

const UserProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;

const Chat = styled.div`
  width: 100%;
  padding: 10px;
  overflow-y: auto;
`;

const MessageRow = styled.div<MessageProps>`
  width: 100%;
  display: flex;
  margin-bottom: 10px;
  justify-content: ${({ isMyMessage }) =>
    isMyMessage ? 'flex-end' : 'flex-start'};
  align-items: flex-start;
`;

const MessageContent = styled.span`
  display: block;
  width: calc(100% - 30px);
  word-wrap: break-word;
`;

const MessageText = styled.div<MessageProps>`
  width: 42%;
  display: flex;
  padding: 8px 12px;
  border-radius: 18px;
  background-color: ${({ isMyMessage }) =>
    isMyMessage ? '#0084ff' : '#e5e5ea'};
  color: ${({ isMyMessage }) => (isMyMessage ? 'white' : 'black')};
  margin-top: 5px;
  word-wrap: break-word;
  justify-content: space-between;
  align-items: flex-end;
`;

const MessageDate = styled.span`
  display: block;
  width: 34px;
  font-size: 12px;
  color: #666;
  padding-left: 6px;
  align-self: flex-end;
`;

const InputDiv = styled.div`
  display: flex;
  padding: 10px;
  background: white;
  border-top: 1px solid #ccc;
`;

const Input = styled.input`
  flex: 1;
  padding: 8px 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 20px;
  outline: none;
`;

const ProfileImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin: 5px 5px 0 0;
`;
