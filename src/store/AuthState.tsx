import { create } from 'zustand';
import { Cookies } from 'react-cookie';
import { AuthState, AuthUser } from '@/interfaces/user/user.interface';
import { useEffect } from 'react';

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  user: null,
  messages: [],
  hasNotifications: false,

  login: (user: AuthUser) => {
    localStorage.setItem('userId', JSON.stringify(user.id));
    localStorage.setItem('nickname', user.nickname);
    localStorage.setItem('profileImageUrl', user.profileImageUrl);
    localStorage.setItem('district', user.district);
    localStorage.setItem('rank', user.rank);
    localStorage.setItem(
      'totalLikeCount',
      JSON.stringify(user.totalLikesCount),
    );
    localStorage.setItem(
      'totalLocalLikesCount',
      JSON.stringify(user.totalLocalLikesCount),
    );
    localStorage.setItem('user', JSON.stringify(user));
    set({
      isLoggedIn: true,
      user,
    });
  },

  logout: () => {
    localStorage.clear();
    new Cookies().remove('accessToken');
    set({
      isLoggedIn: false,
      user: null,
    });
    alert('로그아웃 되었습니다.');
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

function SSEListener() {
  useEffect(() => {
    const eventSource = new EventSource(
      `${import.meta.env.VITE_APP_BASE_URL}/sub/notification/subscibe`,
    );
    console.log('알림구독 완료!');

    eventSource.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      useAuthStore.getState().addMessage(newMessage);
    };

    eventSource.onerror = (error) => {
      console.error('EventSource failed:', error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return null;
}

function initializeUser() {
  const cookies = new Cookies();
  const accessToken = cookies.get('accessToken');
  const storedUser = localStorage.getItem('user');
  if (accessToken && storedUser) {
    const user: AuthUser = JSON.parse(storedUser);
    useAuthStore.getState().login(user);
  } else {
    useAuthStore.getState().logout();
  }
}

function AppInitializer() {
  useEffect(() => {
    initializeUser();
  }, []);

  return <SSEListener />;
}

export { AppInitializer, initializeUser, SSEListener };
