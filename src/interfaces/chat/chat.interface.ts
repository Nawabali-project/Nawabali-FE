export enum MessageType {
  TALK = 'TALK',
  ENTER = 'ENTER',
}

export interface MessageForm {
  sender: string;
  message: string;
  userId: number;
  type: MessageType;
}

export interface ReturnedMessageForm {
  messageId: number;
  messageType: MessageType;
  roomId: number;
  userId: number;
  sender: string;
  message: string;
  createdMessageAt: string;
}

export interface ChatRoom {
  roomId: number;
  roomName: string;
}

export interface ChatRoomProps {
  $isSelected: boolean;
}

export interface User {
  id: number;
  nickname: string;
  imgUrl: string;
}

export interface NewChatRoom {
  chatMessage: any;
  chatRoomEnum: string;
  roomId: number;
  roomName: string;
  roomNumber: string;
  imgUrls: string[];
}
