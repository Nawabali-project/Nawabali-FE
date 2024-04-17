import React, { useState, useEffect, useRef } from 'react';
import { Stomp } from '@stomp/stompjs';
import { searchChatRoom, showChat } from '@/api/chat';
import { Cookies } from 'react-cookie';
import {
  MessageForm,
  ReturnedMessageForm,
} from '@/interfaces/chat/chat.interface';
import SockJS from 'sockjs-client';

export const ChatRoom: React.FC<{ roomId: number }> = ({ roomId }) => {
  const [messages, setMessages] = useState<ReturnedMessageForm[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const clientRef = useRef<any | null>(null);
  const accessToken = new Cookies().get('accessToken');

  useEffect(() => {
    const sock = new SockJS(`${import.meta.env.VITE_APP_BASE_URL}/ws-stomp`);
    const client = Stomp.over(sock);
    client.connect(
      { Authorization: accessToken },
      () => {
        client.subscribe(`/sub/chat/room/${roomId}`, (message) => {
          const msg: ReturnedMessageForm = JSON.parse(message.body);
          setMessages((prevMessages) => [...prevMessages, msg]);
        });
        clientRef.current = client;
      },
      (error: string) => {
        console.log('Connect error:', error);
      },
    );

    return () => {
      clientRef.current?.disconnect();
    };
  }, [roomId, accessToken]);

  useEffect(() => {
    fetchMessages();
  }, [roomId]);

  const fetchMessages = async () => {
    try {
      const messages = await showChat(roomId);
      setMessages(messages);
      searchChatRoom('구로구스윙스');
    } catch (error) {
      console.error('메세지 로딩 실패', error);
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    if (clientRef.current && clientRef.current.connected) {
      const messageForm: MessageForm = {
        sender: localStorage.getItem('nickname')!,
        message: newMessage,
        userId: localStorage.getItem('userId')!,
        chatRoomId: roomId,
      };
      clientRef.current.send(
        `/pub/chat/message`,
        { Authorization: `Bearer ${accessToken}` },
        JSON.stringify(messageForm),
      );
      console.log('Sending message:', messageForm);
      setNewMessage('');
    } else {
      console.error('웹소켓 연결 안됐어~');
    }
  };

  return (
    <div style={{ marginTop: '100px', width: '800px' }}>
      <div>
        {messages.map((msg, index: number) => (
          <div key={index}>
            {msg.sender}: {msg.message} (
            {new Date(msg.createdAt).toLocaleString()})
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>보내기</button>
    </div>
  );
};

export default ChatRoom;
