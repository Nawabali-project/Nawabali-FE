import React, { useState, useEffect } from 'react';
import {
  getChatRooms,
  createRoom,
  enterChatRoom,
  searchUserByNickname,
} from '@/api/chat';
import { IoIosSearch } from 'react-icons/io';
import styled from 'styled-components';
import {
  ChatRoomProps,
  MessageType,
  NewChatRoom,
  User,
} from '@/interfaces/chat/chat.interface';
import { Client } from '@stomp/stompjs';
import Button from '../button/Button';
import { useDebounce } from '@/hooks/useDebounce';

export const ChatRoomsList: React.FC<{
  onRoomSelect: (roomId: number) => void;
  onRoomNameSelect: (roomName: string) => void;
  client: Client | null;
}> = ({ onRoomSelect, onRoomNameSelect, client }) => {
  const [chatRooms, setChatRooms] = useState<NewChatRoom[]>([]);
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [userNickname, setUserNickname] = useState('');
  const [selectedUserNickname, setSelectedUserNickname] = useState('');
  const [searchWord, setSearchWord] = useState<string>('');
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);
  const debouncedUserNickname = useDebounce(userNickname, 300);

  useEffect(() => {
    fetchChatRooms();
  }, []);

  const fetchChatRooms = async () => {
    try {
      const rooms = await getChatRooms();
      const roomsWithUserImages = await Promise.all(
        rooms.map(async (room) => {
          const users = await searchUserByNickname(room.roomName);

          const imgUrls = users.map((user: User) => user.imgUrl);

          return { ...room, imgUrls };
        }),
      );
      setChatRooms(roomsWithUserImages);
    } catch (error) {
      console.error('Failed to load chat rooms or user data', error);
      setChatRooms([]);
    }
  };

  // const handleSearchUserNickname = async (
  //   e: React.ChangeEvent<HTMLInputElement>,
  // ) => {
  //   setUserNickname(e.target.value);
  //   if (e.target.value.trim() === '') {
  //     setSearchResults([]);
  //     return;
  //   }
  //   try {
  //     const response = await searchUserByNickname(userNickname);
  //     setSearchResults(response);
  //   } catch (error) {
  //     console.error('Error searching user by nickname', error);
  //     setSearchResults([]);
  //   }
  // };

  useEffect(() => {
    const fetchUsers = async () => {
      if (debouncedUserNickname.trim() === '') {
        setSearchResults([]);
        return;
      }
      try {
        const response = await searchUserByNickname(debouncedUserNickname);
        setSearchResults(response);
      } catch (error) {
        console.error('Error searching user by nickname', error);
        setSearchResults([]);
      }
    };

    fetchUsers();
  }, [debouncedUserNickname]);

  const handleSelectUser = (nickname: string) => {
    setSelectedUserNickname(nickname);
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
      onRoomNameSelect(selectedUserNickname);
      enterChatRoom(client, messageForm);
    }
  };

  return (
    <ChatList>
      <h1>채팅방이욤</h1>
      <div>
        <SearchDiv>
          <input
            type="text"
            value={userNickname}
            onChange={(e) => setUserNickname(e.target.value)}
            placeholder="유저닉네임 검색"
          />
        </SearchDiv>
        {searchResults.length > 0 && (
          <SearchedUserDiv>
            {searchResults.map((user: User, index: number) => (
              <div key={index} onClick={() => handleSelectUser(user.nickname)}>
                <Row>
                  <UserNicknamesDiv>
                    <ProfileImg $profileImg={user.imgUrl} />
                    {user.nickname}
                  </UserNicknamesDiv>
                  <Button size="chat" onClick={handleCreateRoom}>
                    채팅 생성
                  </Button>
                </Row>
              </div>
            ))}
          </SearchedUserDiv>
        )}
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
        <Col>
          {chatRooms.map((room) => (
            <ChatRooms
              key={room.roomId}
              $isSelected={selectedRoomId === room.roomId}
              onClick={() => handleRoomClick(room.roomId)}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <ProfileImg $profileImg={room.imgUrls[0]} />
                <span>{room.roomName}</span>
              </div>
            </ChatRooms>
          ))}
        </Col>
      </div>
    </ChatList>
  );
};

export default ChatRoomsList;

const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  width: 280px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  &:hover {
    background-color: #e9e9e9;
  }
`;

const ChatList = styled.div`
  width: 300px;
  height: 500px;
  margin: 100px 0 0 100px;
  background-color: white;
  border-radius: 20px;
  overflow-y: auto;

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

const ProfileImg = styled.div<{ $profileImg: string }>`
  width: 30px;
  height: 30px;
  background-image: url(${(props) => props.$profileImg});
  border-radius: 50%;
  border: 1px solid #d9d9d9;
  background-size: cover;
  margin: 0 10px;
`;

const SearchDiv = styled.div`
  border: 1px solid gray;
  border-radius: 15px;
  height: 30px;
  width: 260px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 10px 0 5px;
  margin: 0 auto;

  input {
    width: 250px;
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
  background-color: ${(props) => (props.$isSelected ? '#e9e9e9' : 'white')};
  cursor: pointer;
  line-height: 50px;
  &:hover {
    background-color: #e9e9e9;
  }
`;

const SearchedUserDiv = styled.div`
  margin-top: 10px;
  background-color: #fff;
  padding: 10px 0;
`;

const UserNicknamesDiv = styled.div`
  width: 200px;
  display: flex;
  align-items: center;
`;
