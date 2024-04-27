import { authInstance } from '@/axios';
import { MessageForm } from '@/interfaces/chat/chat.interface';
import { AxiosError } from 'axios';
import { ErrorResponse } from 'react-router-dom';
import { Client } from '@stomp/stompjs';
import { Cookies } from 'react-cookie';

export const getChatRooms = async () => {
  try {
    const response = await authInstance.get('/chat/rooms');
    return response.data.content;
  } catch (error) {
    throw error as AxiosError<ErrorResponse>;
  }
};

export const createRoom = async (userNickname: string): Promise<number> => {
  try {
    const response = await authInstance.post(
      `/chat/room?roomName=${userNickname}&type=PERSONAL`,
    );
    return response.data.roomId;
  } catch (error) {
    throw error as AxiosError<ErrorResponse>;
  }
};

export const searchChatRoom = async (userNickname: string): Promise<any[]> => {
  try {
    const response = await authInstance.get(
      `/chat/room/found?roomName=${userNickname}`,
    );
    return response.data;
  } catch (error) {
    throw error as AxiosError<ErrorResponse>;
  }
};

export const enterChatRoom = (client: Client, messageForm: MessageForm) => {
  const accessToken = new Cookies().get('accessToken');
  try {
    client.publish({
      destination: '/pub/chat/enter/message',
      headers: { Authorization: `Bearer ${accessToken}` },
      body: JSON.stringify(messageForm),
    });
  } catch (error) {
    console.error('입장 실패', error);
  }
};

export const sendMessage = (client: Client, messageForm: MessageForm) => {
  const accessToken = new Cookies().get('accessToken');
  try {
    if (client && client.active) {
      client.publish({
        destination: '/pub/chat/message',
        headers: { Authorization: `Bearer ${accessToken}` },
        body: JSON.stringify(messageForm),
      });
    } else {
      console.error('WebSocket connection is not active.');
    }
  } catch (error) {
    console.error('Failed to send message', error);
  }
};

export const showChat = async (roomId: number) => {
  try {
    const response = await authInstance.get(`/chat/room/${roomId}/message`);
    return response.data;
  } catch (error) {
    throw error as AxiosError<ErrorResponse>;
  }
};

export const editChat = async (content: string) => {
  try {
    const response = await authInstance.patch(`/chat/message`, content);
    return response.data;
  } catch (error) {
    throw error as AxiosError<ErrorResponse>;
  }
};

export const deleteChat = async () => {
  try {
    const response = await authInstance.delete(`/chat/message`);
    return response.data;
  } catch (error) {
    throw error as AxiosError<ErrorResponse>;
  }
};

export const searchUserByNickname = async (nickname: string) => {
  try {
    const response = await authInstance.get(
      `/users/search?nickname=${nickname}`,
    );
    return response.data;
  } catch (error) {
    throw error as AxiosError<ErrorResponse>;
  }
};
