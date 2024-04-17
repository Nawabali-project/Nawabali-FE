import { useState } from 'react';
import ChatRoomsList from './ChatRoomsList';
import ChatRoom from './ChatRoom';

function ChatMain() {
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);

  return (
    <div style={{ backgroundColor: '#F9F9F9', display: 'flex' }}>
      <ChatRoomsList onRoomSelect={setSelectedRoomId} />
      {selectedRoomId && <ChatRoom roomId={selectedRoomId} />}
    </div>
  );
}

export default ChatMain;
