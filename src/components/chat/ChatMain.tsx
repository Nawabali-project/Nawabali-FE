import { useState, useEffect } from 'react';
import ChatRoomsList from './ChatRoomsList';
import ChatRoom from './ChatRoom';
import SockJS from 'sockjs-client';
import { Stomp, Client } from '@stomp/stompjs';

function ChatMain() {
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);
  const [stompClient, setStompClient] = useState<Client | null>(null);

  useEffect(() => {
    const connectWebSocket = () => {
      const socket = new SockJS(`https://hhboard.shop/ws-stomp`);
      const client = Stomp.over(socket);

      client.connect(
        {},
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
    <div style={{ backgroundColor: '#F9F9F9', display: 'flex' }}>
      <ChatRoomsList onRoomSelect={setSelectedRoomId} client={stompClient} />
      {selectedRoomId && (
        <ChatRoom roomId={selectedRoomId} client={stompClient} />
      )}
    </div>
  );
}

export default ChatMain;
