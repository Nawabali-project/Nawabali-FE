import { SSEState } from '@/interfaces/chat/chat.interface';
import { createWithEqualityFn } from 'zustand/traditional';

// 스토어 정의
const useSSEStore = createWithEqualityFn<SSEState>((set) => ({
  hasUnreadMessageCount: false,
  unreadMessageCount: 0,
  hasChanges: false,

  // 알림 수 설정 함수
  setHasUnreadMessageCount: (hasUnreadMessageCount: boolean) =>
    set({ hasUnreadMessageCount }),

  // 알림 수 설정 함수
  setUnreadMessageCount: (count: number) => set({ unreadMessageCount: count }),

  //새 채팅 여부
  setHasChanges: (hasChanges: boolean) => set({ hasChanges }),
}));

export default useSSEStore;
