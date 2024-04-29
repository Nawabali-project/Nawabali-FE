import { SSEState } from '@/interfaces/chat/chat.interface';
import { createWithEqualityFn } from 'zustand/traditional';

// 스토어 정의
const useSSEStore = createWithEqualityFn<SSEState>((set) => ({
  message: '',
  hasNotifications: false,
  notificationCount: 0,

  addMessage: (newMessage: string) =>
    set({
      message: newMessage,
      hasNotifications: true,
    }),

  // 알림 플래그 설정 함수
  setHasNotifications: (hasNotifications: boolean) => set({ hasNotifications }),

  // 알림 수 설정 함수
  setNotificationCount: (count: number) => set({ notificationCount: count }),
}));

export default useSSEStore;
