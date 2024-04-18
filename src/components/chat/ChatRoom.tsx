import React, { useState, useEffect } from 'react';
import { Client, Message } from '@stomp/stompjs';
import { showChat } from '@/api/chat';
import { Cookies } from 'react-cookie';
import {
  MessageForm,
  MessageType,
  ReturnedMessageForm,
} from '@/interfaces/chat/chat.interface';

export const ChatRoom: React.FC<{ roomId: number; client: Client | null }> = ({
  roomId,
  client,
}) => {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<ReturnedMessageForm[]>([]);
  const accessToken = new Cookies().get('accessToken');

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
          const receivedMessage: ReturnedMessageForm = {
            ...JSON.parse(message.body),
            createdAt: new Date(),
          };
          setMessages((prevMessages) => [receivedMessage, ...prevMessages]);
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

  const handleSendMessage = () => {
    if (!message.trim()) return;

    if (!stompClient?.connected) {
      console.error('WebSocket connection is not active.');
      return;
    }

    const chatMessage: MessageForm = {
      type: MessageType.TALK,
      message,
      sender: localStorage.getItem('nickname')!.split('"')[1],
      userId: parseInt(localStorage.getItem('userId')!),
      roomId: roomId,
    };

    stompClient.publish({
      destination: '/pub/chat/message',
      headers: { Authorization: `Bearer ${accessToken}` },
      body: JSON.stringify(chatMessage),
    });

    setMessage('');
    console.log('메시지 전송: ', chatMessage);
  };

  return (
    <div style={{ marginTop: '100px', width: '800px' }}>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            {msg.sender}: {msg.message} ({msg.createdAt})
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>보내기</button>
    </div>
  );
};

export default ChatRoom;
