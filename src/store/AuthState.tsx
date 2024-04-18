import { create } from 'zustand';
import { Cookies } from 'react-cookie';
import { AuthState, User } from '@/interfaces/user/user.interface';

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  user: null,

  login: (user: User) => {
    localStorage.setItem('user', JSON.stringify(user));
    set({
      isLoggedIn: true,
      user,
    });
  },

  logout: () => {
    localStorage.clear();
    set({
      isLoggedIn: false,
      user: null,
    });
  },

  setIsLoggedIn: (isLoggedIn: boolean) => {
    set({ isLoggedIn });
  },
}));

export default useAuthStore;

function initializeUser() {
  const cookies = new Cookies();
  const accessToken = cookies.get('accessToken');
  const storedUser = localStorage.getItem('user');
  if (accessToken && storedUser) {
    const user: User = JSON.parse(storedUser);
    useAuthStore.getState().login(user);
  } else {
    useAuthStore.getState().logout();
  }
}

initializeUser();
