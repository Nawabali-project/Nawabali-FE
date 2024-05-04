import React, { useState, useEffect, useRef } from 'react';
import { Client, Message } from '@stomp/stompjs';
import { searchUserByNickname, sendMessage, showChat } from '@/api/chat';
import { Cookies } from 'react-cookie';
import {
  ChatApiResponse,
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
import useIsMounted from '@/hooks/useIsMounted';

export const ChatRoom: React.FC<{
  roomId: number;
  roomName: string;
  client: Client | null;
  isRoomActive: boolean;
}> = ({ roomId, roomName, client }) => {
  const isMounted = useIsMounted();
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<ReturnedMessageForm[]>([]);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [isComposing, setIsComposing] = useState(false);
  const accessToken = new Cookies().get('accessToken');
  const myNickname = localStorage.getItem('nickname');
  const navigate = useNavigate();
  const setHasChanges = useSSEStore((state) => state.setHasChanges);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView({ threshold: 0.1 });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<ChatApiResponse, Error>({
      queryKey: ['chatRoomMessages', roomId],
      queryFn: async ({ pageParam = 0 }) => {
        return showChat({ pageParam: Number(pageParam), roomId });
      },
      getNextPageParam: (lastPage) =>
        !lastPage.last ? lastPage.pageable.pageNumber + 1 : undefined,
      initialPageParam: 0,
      enabled: true,
    });

  useEffect(() => {
    if (data?.pages.length === 0 && !isFetchingNextPage && hasNextPage) {
      fetchNextPage();
      if (data) {
        const newMessages = data.pages.flatMap((page) => page.content);
        setMessages((prev) => [...prev, ...newMessages]);
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [data, fetchNextPage, isFetchingNextPage, hasNextPage]);

  useEffect(() => {
    if (!isFetchingNextPage && inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

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
      return () => {
        subscription.unsubscribe();
        setHasChanges(false);
      };
    }
  }, [roomId, client, accessToken]);

  useEffect(() => {
    if (roomName) {
      const fetchUserInfo = async () => {
        try {
          const user = await searchUserByNickname(roomName);
          setUserInfo(user?.length > 0 ? user[0] : null);
        } catch (error) {
          console.error('Failed to fetch user info', error);
        }
      };
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
      .then(() => {
        if (isMounted.current) setMessage('');
      })
      .catch((error) => {
        if (isMounted.current) console.error('Failed to send message:', error);
      });
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
    return `${month < 10 ? '0' : ''}${month}.${day < 10 ? '0' : ''}${day} ${hour < 10 ? '0' : ''}${hour}:${minute < 10 ? '0' : ''}${minute}`;
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
                  ? localStorage.getItem('profileImageUrl')!.split('"')[1]
                  : userInfo?.imgUrl
              }
            />
            <MessageText isMyMessage={msg.sender === myNickname}>
              <MessageContent>{msg.message}</MessageContent>
              <MessageDate isMyMessage={msg.sender === myNickname}>
                {formatMessageDate(msg.createdMessageAt)}
              </MessageDate>
            </MessageText>
          </MessageRow>
        ))}
        <div ref={messagesEndRef} />
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
  height: 85vh;
  margin: 100px 0 0 20px;
  padding: 0 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background-color: white;
  border-radius: 20px;
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
  height: calc(100% - 60px);

  &::-webkit-scrollbar {
    width: 8px;
    height: 15px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
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
  align-items: flex-start;
`;

const MessageDate = styled.span<MessageProps>`
  display: block;
  width: 34px;
  font-size: 12px;
  color: ${({ isMyMessage }) => (isMyMessage ? 'white' : '#666')};
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
  border: 1px solid #d9d9d9;
`;
