export interface MessageForm {
  sender: string;
  message: string;
  userId: string;
  chatRoomId: number;
}

export enum MessageType {
  JOIN = 'JOIN',
  LEAVE = 'LEAVE',
  MESSAGE = 'MESSAGE',
}

export interface ReturnedMessageForm {
  messageId: number;
  messageType: ReturnedMessageType;
  roomId: number;
  userId: number;
  sender: string;
  message: string;
  createdAt: string;
}

export enum ReturnedMessageType {
  TALK = 'TALK',
}

export interface ChatRoom {
  roomId: number;
  roomName: string;
}

export interface ChatRoomProps {
  $isSelected: boolean;
}
