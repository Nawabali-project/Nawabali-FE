import { SSEState } from '@/interfaces/chat/chat.interface';
import { createWithEqualityFn } from 'zustand/traditional';

// 스토어 정의
const useSSEStore = createWithEqualityFn<SSEState>((set) => ({
  hasUnreadMessageCount: false,
  unreadMessageCount: 0,

  // 알림 플래그 설정 함수
  setHasUnreadMessageCount: (hasUnreadMessageCount: boolean) =>
    set({ hasUnreadMessageCount }),

  // 알림 수 설정 함수
  setUnreadMessageCount: (count: number) => set({ unreadMessageCount: count }),
}));

export default useSSEStore;
