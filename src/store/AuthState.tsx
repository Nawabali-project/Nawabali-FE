import { createWithEqualityFn } from 'zustand/traditional';
// import { Cookies } from 'react-cookie';
import { AuthState } from '@/interfaces/user/user.interface';

export const useAuthStore = createWithEqualityFn<AuthState>((set) => ({
  isLoggedIn: false,
  user: null,
  loading: true,

  initializeLoginState: async () => {
    // const cookies = new Cookies();
    try {
      // const accessToken = cookies.get('accessToken');
      // const accessToken = cookies.get('Authorization');
      const userJson = localStorage.getItem('user');
      // if (accessToken && userJson) {
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
    localStorage.clear();
    // new Cookies().remove('accessToken');
    set({ isLoggedIn: false, user: null });
    alert('로그아웃 성공!');
  },

  setIsLoggedIn: (isLoggedIn: boolean, user = null) => {
    set({ isLoggedIn, user });
  },

  setUser: (user) => {
    set({ user });
  },
}));

export default useAuthStore;
