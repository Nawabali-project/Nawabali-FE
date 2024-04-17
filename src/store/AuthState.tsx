import { create } from 'zustand';
import { Cookies } from 'react-cookie';

interface User {
  email: string;
  nickname: string;
  profileImageUrl: string;
  district: string;
}

interface AuthState {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  user: null,

  login: (user: User) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('email', JSON.stringify(user.email));
    localStorage.setItem('nickname', JSON.stringify(user.nickname));
    localStorage.setItem('district', JSON.stringify(user.district));
    localStorage.setItem(
      'profileImageUrl',
      JSON.stringify(user.profileImageUrl),
    );
    set({
      isLoggedIn: true,
      user,
    });
  },

  logout: () => {
    set({
      isLoggedIn: false,
      user: null,
    });
    localStorage.removeItem('email');
    localStorage.removeItem('nickname');
    localStorage.removeItem('district');
    localStorage.removeItem('profileImageUrl');
    localStorage.removeItem('userId');
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
