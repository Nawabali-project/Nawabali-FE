import { createWithEqualityFn } from 'zustand/traditional';
import { Cookies } from 'react-cookie';
import { AuthState } from '@/interfaces/user/user.interface';
import { useEffect } from 'react';
import { EventSourcePolyfill } from 'event-source-polyfill';

export const useAuthStore = createWithEqualityFn<AuthState>((set) => ({
  isLoggedIn: false,
  user: null,
  messages: [],
  hasNotifications: false,

  initializeLoginState: () => {
    const cookies = new Cookies();
    try {
      const accessToken = cookies.get('accessToken');
      const userJson = localStorage.getItem('user');
      if (accessToken && userJson) {
        const user = JSON.parse(userJson);
        set({
          isLoggedIn: true,
          user,
        });
      }
    } catch (error) {
      console.error('Failed to initialize login state:', error);
    }
  },

  login: () => {
    set({ isLoggedIn: true });
  },

  logout: () => {
    localStorage.clear();
    new Cookies().remove('accessToken');
    set({ isLoggedIn: false, user: null });
    alert('로그아웃 성공!');
  },

  setIsLoggedIn: (isLoggedIn: boolean) => {
    set({ isLoggedIn });
  },

  addMessage: (message: any) =>
    set((state) => ({
      messages: [...state.messages, message],
      hasNotifications: true,
    })),

  setHasNotifications: (hasNotifications: boolean) => {
    set({ hasNotifications });
  },
}));

export default useAuthStore;

export function SSEListener() {
  const cookie = new Cookies();
  const { isLoggedIn, user } = useAuthStore();
  const accessToken = cookie.get('accessToken');

  useEffect(() => {
    if (!isLoggedIn || !accessToken) return;

    const eventSource = new EventSourcePolyfill(
      'https://hhboard.shop/notification/subscribe',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        heartbeatTimeout: 90000,
      },
    );

    eventSource.onmessage = (event: any) => {
      const newMessage = JSON.parse(event.data);
      console.log('SSE new message: ', newMessage);

      useAuthStore.getState().addMessage(newMessage);
    };

    eventSource.onerror = (error: any) => {
      console.error('EventSource failed:', error);
      if (eventSource.readyState === EventSource.CLOSED) {
        console.error('EventSource connection was closed.');
      }
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [isLoggedIn, user]);

  return null;
}
