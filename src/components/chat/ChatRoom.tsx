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
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  // 스크롤 상태 관리 변수
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const previousScrollHeight = useRef<number>(0);
  const previousScrollTop = useRef<number>(0);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  // 첫 마운트 시 초기화
  useEffect(() => {
    setMessages([]);
    queryClient.invalidateQueries();
  }, [roomId]);

  const {
    data: chatData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<ChatApiResponse>({
    queryKey: [roomId, 'infinite'],
    queryFn: ({ pageParam = 0 }) =>
      showChat({ pageParam: Number(pageParam), roomId }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      !lastPage.last ? lastPage.pageable.pageNumber + 1 : undefined,
  });

  // 스크롤을 감지하여 다음 페이지 요청
  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer && !isFetchingNextPage) {
      chatContainer.scrollTop =
        chatContainer.scrollHeight -
        previousScrollHeight.current +
        previousScrollTop.current;
    }
  }, [chatData, isFetchingNextPage]);

  // 스크롤 위치 저장
  const handleScroll = () => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer && chatContainer.scrollTop === 0 && hasNextPage) {
      previousScrollHeight.current = chatContainer.scrollHeight;
      previousScrollTop.current = chatContainer.scrollTop;
      fetchNextPage();
    }
  };

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (chatContainer) {
        chatContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [hasNextPage]);

  //페이지 추가 후 스크롤 위치 조정
  useEffect(() => {
    if (!isScrolling && !isFetchingNextPage && hasNextPage) {
      const chatContainer = chatContainerRef.current;

      if (chatContainer) {
        const lastPage = chatData?.pages[chatData.pages.length - 1];
        const lastMessage = lastPage?.content[lastPage.content.length - 1];

        if (lastMessage) {
          // 마지막 메시지를 가리키는 DOM 요소를 찾아서 스크롤
          const lastMessageElement = document.getElementById(
            `message-${lastMessage.id}`,
          );
          if (lastMessageElement) {
            lastMessageElement.scrollIntoView();
          }
        }

        setIsScrolling(false);
      }
    }
  }, [isFetchingNextPage, hasNextPage, isScrolling, chatData]);

  // 실시간 메시지 수신 처리
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
          setMessages((prevMessages) => {
            const updatedMessages = [...prevMessages, receivedMessage];
            updatedMessages.sort((a, b) => a.id - b.id);
            return updatedMessages;
          });
          setHasChanges(true);

          messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

          const timer = setTimeout(() => {
            setHasChanges(false);
          }, 1000);
          return () => clearTimeout(timer);
        },
        headers,
      );
      return () => {
        subscription.unsubscribe();
        setHasChanges(false);
      };
    }
  }, [roomId, client, accessToken, setHasChanges]);

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
        setMessage('');
      })
      .catch((error) => {
        console.error('Error occurred while sending message:', error);
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

  // 첫 렌더링 시 스크롤을 맨 밑으로 이동
  useEffect(() => {
    if (isFirstLoad && chatData) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      setIsFirstLoad(false);
    }
  }, [chatData]);

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
      <Chat ref={chatContainerRef}>
        {chatData?.pages
          .slice()
          .reverse()
          .map((page, pageIndex) => (
            <div key={pageIndex}>
              {page.content
                .slice()
                .reverse()
                .map((msg: ReturnedMessageForm) => (
                  <MessageRow
                    key={msg.id}
                    $isMyMessage={msg.sender === myNickname}
                  >
                    <ProfileImg
                      src={
                        msg.sender === myNickname
                          ? localStorage
                              .getItem('profileImageUrl')!
                              .split('"')[1]
                          : userInfo?.imgUrl
                      }
                    />
                    <MessageText $isMyMessage={msg.sender === myNickname}>
                      <MessageContent>{msg.message}</MessageContent>
                      <MessageDate $isMyMessage={msg.sender === myNickname}>
                        {formatMessageDate(msg.createdMessageAt)}
                      </MessageDate>
                    </MessageText>
                  </MessageRow>
                ))}
            </div>
          ))}

        {messages.map((msg) => (
          <MessageRow key={msg.id} $isMyMessage={msg.sender === myNickname}>
            <ProfileImg
              src={
                msg.sender === myNickname
                  ? localStorage.getItem('profileImageUrl')!.split('"')[1]
                  : userInfo?.imgUrl
              }
            />
            <MessageText $isMyMessage={msg.sender === myNickname}>
              <MessageContent>{msg.message}</MessageContent>
              <MessageDate $isMyMessage={msg.sender === myNickname}>
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
  height: 700px;
  margin: 100px 100px 0 20px;
  padding: 0 10px;
  width: 60vw;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background-color: white;
  border-radius: 20px;
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
  height: calc(100% - 60px);
  width: 98%;
  padding: 10px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
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
  justify-content: ${({ $isMyMessage }) =>
    $isMyMessage ? 'flex-end' : 'flex-start'};
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
  background-color: ${({ $isMyMessage }) =>
    $isMyMessage ? '#0084ff' : '#e5e5ea'};
  color: ${({ $isMyMessage }) => ($isMyMessage ? 'white' : 'black')};
  margin-top: 5px;
  word-wrap: break-word;
  justify-content: space-between;
  align-items: flex-start;
`;

const MessageDate = styled.span<MessageProps>`
  display: block;
  width: 34px;
  font-size: 12px;
  color: ${({ $isMyMessage }) => ($isMyMessage ? 'white' : '#666')};
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
