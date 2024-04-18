import React, { useState, useEffect } from 'react';
import { getChatRooms, createRoom, enterChatRoom } from '@/api/chat';
import { IoIosSearch } from 'react-icons/io';
import styled from 'styled-components';
import {
  ChatRoom,
  ChatRoomProps,
  MessageType,
} from '@/interfaces/chat/chat.interface';
import { Client } from '@stomp/stompjs';

export const ChatRoomsList: React.FC<{
  onRoomSelect: (roomId: number) => void;
  client: Client | null;
}> = ({ onRoomSelect, client }) => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [userNickname, setUserNickname] = useState('');
  const [searchWord, setSearchWord] = useState<string>('');
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);

  useEffect(() => {
    fetchChatRooms();
  }, []);

  const fetchChatRooms = async () => {
    try {
      const rooms = await getChatRooms();
      setChatRooms(rooms);
    } catch (error) {
      console.error('로딩 실패', error);
      setChatRooms([]);
    }
  };

  const handleCreateRoom = async () => {
    if (!userNickname.trim()) {
      alert('상대방 닉네임을 입력하세요');
      return;
    }
    try {
      await createRoom(userNickname);
    } catch (error) {
      console.error('채팅방 생성 실패', error);
      alert('채팅 생성에 실패했습니다.');
    }
  };

  const handleRoomClick = (roomId: number) => {
    if (client) {
      const messageForm = {
        sender: localStorage.getItem('nickname')!,
        message: '',
        userId: parseInt(localStorage.getItem('userId')!),
        roomId: roomId,
        type: MessageType.ENTER,
      };
      setSelectedRoomId(roomId);
      onRoomSelect(roomId);
      enterChatRoom(client, messageForm);
      console.log('채팅방 입장');
    }
  };

  return (
    <ChatList>
      <h1>채팅방이욤</h1>
      <div>
        <input
          type="text"
          value={userNickname}
          onChange={(e) => setUserNickname(e.target.value)}
          placeholder="유저닉네임"
        />
        <button onClick={handleCreateRoom}>채팅 생성</button>
      </div>
      <div>
        <SearchDiv style={{ position: 'relative' }}>
          <IoIosSearch style={{ color: 'gray' }} />
          <input
            value={searchWord}
            type="text"
            placeholder="닉네임 또는 내용으로 검색하기"
            onChange={(e) => setSearchWord(e.target.value)}
          />
        </SearchDiv>
        <div>
          {chatRooms.map((room) => (
            <ChatRooms
              key={room.roomId}
              $isSelected={selectedRoomId === room.roomId}
              onClick={() => handleRoomClick(room.roomId)}
            >
              {room.roomName}
            </ChatRooms>
          ))}
        </div>
      </div>
    </ChatList>
  );
};

export default ChatRoomsList;

const ChatList = styled.div`
  width: 300px;
  margin: 100px 0 0 100px;
  background-color: white;
  border-radius: 20px;
`;

const SearchDiv = styled.div`
  border: 1px solid gray;
  border-radius: 15px;
  height: 30px;
  width: 250px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 10px;

  input {
    width: 230px;
    border: none;
    font-size: 13px;
    &:focus {
      outline: none;
    }
  }
`;

const ChatRooms = styled.div<ChatRoomProps>`
  width: 300px;
  height: 50px;
  background-color: ${(props) => (props.$isSelected ? '#F9F9F9' : 'white')};
  cursor: pointer;
  line-height: 50px;
`;
