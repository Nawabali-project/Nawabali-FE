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
  rankName: string;
  district: string;
}

export interface NewChatRoom {
  chatMessage: string;
  chatRoomEnum: string;
  roomId: number;
  roomName: string;
  profileImageUrl: string;
  unreadCount: number;
}

export interface SSEState {
  hasUnreadMessageCount: boolean;
  setHasUnreadMessageCount: (hasUnreadMessageCount: boolean) => void;
  unreadMessageCount: number;
  setUnreadMessageCount: (count: number) => void;
  hasChanges: boolean;
  setHasChanges: (hasChanges: boolean) => void;
}

export interface MessageProps {
  isMyMessage: boolean;
}

export interface ReturnedMessageForm {
  id: number;
  roomId: number;
  userId: number;
  sender: string;
  message: string;
  receiver: string;
  createdMessageAt: string;
  read: boolean;
  receiverRead: boolean;
}

export interface ChatApiResponse {
  content: ReturnedMessageForm[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}
