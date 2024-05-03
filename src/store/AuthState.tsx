import { createWithEqualityFn } from 'zustand/traditional';
// import { Cookies } from 'react-cookie';
import { AuthState } from '@/interfaces/user/user.interface';
import { Cookies } from 'react-cookie';

export const useAuthStore = createWithEqualityFn<AuthState>((set) => ({
  isLoggedIn: false,
  user: null,
  loading: true,

  initializeLoginState: async () => {
    try {
      const userJson = localStorage.getItem('user');
      if (userJson) {
        const user = JSON.parse(userJson);
        set({
          isLoggedIn: true,
          user,
          loading: false,
        });
      } else {
        set({ loading: false });
      }
    } catch (error) {
      console.error('Failed to initialize login state:', error);
      set({ isLoggedIn: false, loading: false, user: null });
    }
  },

  login: (user) => {
    set({ isLoggedIn: true, user });
    localStorage.setItem('user', JSON.stringify(user));
  },

  logout: () => {
    new Cookies().remove('accessToken');
    localStorage.clear();
    set({ isLoggedIn: false, user: null });
    alert('로그아웃 성공!');
  },

  setIsLoggedIn: (isLoggedIn: boolean, user = null) => {
    set({ isLoggedIn, user });
  },
}));

export default useAuthStore;
