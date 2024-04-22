import React, { useState, useEffect, useRef } from 'react';
import { Client, Message } from '@stomp/stompjs';
import { showChat } from '@/api/chat';
import { Cookies } from 'react-cookie';
import {
  MessageForm,
  MessageType,
  ReturnedMessageForm,
} from '@/interfaces/chat/chat.interface';
import styled from 'styled-components';

export const ChatRoom: React.FC<{ roomId: number; client: Client | null }> = ({
  roomId,
  client,
}) => {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<ReturnedMessageForm[]>([]);
  const accessToken = new Cookies().get('accessToken');
  const myNickname = localStorage.getItem('nickname');
  const chatEndRef = useRef<HTMLDivElement>(null);
  const stompClient = client;

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
              createdAt: new Date(),
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

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
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

  return (
    <ChatContainer>
      <UserInfo></UserInfo>
      <Chat>
        {messages.map((msg, index) =>
          msg.sender === myNickname ? (
            <MyMessage key={index}>
              {msg.message} ({new Date(msg.createdAt).toLocaleString()})
            </MyMessage>
          ) : (
            <OtherMessage key={index}>
              {msg.message} {new Date(msg.createdAt).toLocaleString()}
            </OtherMessage>
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

const ChatContainer = styled.div`
  margin-top: 100px;
  margin-left: 20px;
  height: 740px;
  width: 60vw;
  background-color: white;
  border-radius: 20px;
`;

const UserInfo = styled.div`
  height: 100px;
  border-bottom: 1px solid #cccccc;
`;

const Chat = styled.div`
  display: flex;
  flex-direction: column;
  height: 550px;
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
  width: 400px;
  background-color: #f0f0f0;
  padding: 5px;
  border-radius: 8px;
  align-self: flex-start;
`;

const OtherMessage = styled.div`
  width: 400px;
  background-color: #00a3ff;
  padding: 5px;
  border-radius: 8px;
  color: white;
  align-self: flex-end;
`;

const InputDiv = styled.div`
  width: 730px;
  height: 30px;
  border: 1px solid #cccccc;
  border-radius: 15px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 10px;
  margin: 10px auto 0;

  input {
    width: 550px;
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
