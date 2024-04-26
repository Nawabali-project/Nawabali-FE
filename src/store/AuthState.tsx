import { createWithEqualityFn } from 'zustand/traditional';
import { Cookies } from 'react-cookie';
import { AuthState, AuthUser } from '@/interfaces/user/user.interface';
import { useEffect } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

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

function SSEListener() {
  useEffect(() => {
    const eventSource = new EventSource(
      `${import.meta.env.VITE_APP_BASE_URL}/sub/notification/subscibe`,
    );

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

function initializeUser(navigate: NavigateFunction) {
  const cookie = new Cookies();

  const accessToken = cookie.get('accessToken');

  const storedUser = localStorage.getItem('user');
  if (accessToken && storedUser) {
    const user: AuthUser = JSON.parse(storedUser);
    useAuthStore.getState().login(user);
    navigate('/');
  } else {
    useAuthStore.getState().logout();
  }
}

function AppInitializer() {
  const navigate = useNavigate();

  initializeUser(navigate);

  return <SSEListener />;
}

export { AppInitializer };
