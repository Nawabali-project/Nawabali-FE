import { useState, useEffect } from 'react';
import ChatRoomsList from '../components/chat/ChatRoomsList';
import ChatRoom from '../components/chat/ChatRoom';
import SockJS from 'sockjs-client';
import { Stomp, Client } from '@stomp/stompjs';
import { Cookies } from 'react-cookie';
import NoChat from '@/components/chat/NoChat';

function ChatMain() {
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);
  const [stompClient, setStompClient] = useState<Client | null>(null);

  useEffect(() => {
    const connectWebSocket = () => {
      const socket = new SockJS(`https://hhboard.shop/ws-stomp`);
      const client = Stomp.over(socket);
      const accessToken = new Cookies().get('accessToken');

      client.connect(
        { Authorization: `Bearer ${accessToken}` },
        () => {
          setStompClient(client);
        },
        (error: any) => {
          console.error('Connection error', error);
        },
      );

      return () => {
        if (client) {
          socket.close();
          client.disconnect(() => {
            console.log('Disconnected');
          });
        }
      };
    };

    connectWebSocket();
  }, []);

  return (
    <div
      style={{
        backgroundColor: '#F9F9F9',
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
      }}
    >
      <ChatRoomsList onRoomSelect={setSelectedRoomId} client={stompClient} />
      {selectedRoomId ? (
        <ChatRoom roomId={selectedRoomId} client={stompClient} />
      ) : (
        <NoChat />
      )}
    </div>
  );
}

export default ChatMain;
