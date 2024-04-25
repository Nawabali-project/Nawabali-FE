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
  const accessToken = new Cookies().get('accessToken');
  const myNickname = localStorage.getItem('nickname');
  const chatEndRef = useRef<HTMLDivElement>(null);
  const stompClient = client;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const user = await searchUserByNickname(roomName);
        setUserInfo(user[0]);
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
            console.log('Received message:', receivedMessage);
            setMessages((prevMessages) => [...prevMessages, receivedMessage]);
          } catch (error) {
            console.error('Failed to parse message:', message.body, error);
          }
        },
        headers,
      );

      console.log('구독 성공');
    }
  }, [roomId, client, accessToken]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const fetchedMessages: ReturnedMessageForm[] = await showChat(roomId);
        setMessages(fetchedMessages);
      } catch (error) {
        console.error('Failed to load messages', error);
      }
    };

    fetchMessages();
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
    console.log('메시지 전송: ', chatMessage);
  };

  const goToUserProfile = (userNick: string) => {
    navigate(`/userProfile/${userNick}`);
  };

  return (
    <ChatContainer>
      {roomName && userInfo && (
        <UserInfo>
          <UserProfileImg
            src={userInfo.imgUrl}
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
                src={localStorage.getItem('profileImageUrl')!}
                alt="내 프로필"
              />
              <MyMessage>
                <span>{msg.message}</span>
                <span>({new Date(msg.createdMessageAt).toLocaleString()})</span>
              </MyMessage>
            </Row>
          ) : (
            <Row key={index} style={{ alignSelf: 'flex-start' }}>
              <ProfileImg src={userInfo!.imgUrl} alt={`상대방 프로필`} />
              <OtherMessage>
                {msg.message} {new Date(msg.createdMessageAt).toLocaleString()}
              </OtherMessage>
            </Row>
          ),
        )}
        <div ref={chatEndRef} />
      </Chat>

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
  height: 750px;
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
  overflow: auto;
  padding: 0 20px 20px;
  transform: scaleY(-1);

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
  width: 300px;
  background-color: #00a3ff;
  padding: 5px;
  color: white;
  border-radius: 8px;
  transform: scaleY(-1);
`;

const OtherMessage = styled.div`
  width: 300px;
  background-color: #f0f0f0;
  padding: 5px;
  border-radius: 8px;
  transform: scaleY(-1);
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
