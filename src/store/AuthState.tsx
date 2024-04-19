import { create } from 'zustand';
import { Cookies } from 'react-cookie';
import { AuthState, AuthUser } from '@/interfaces/user/user.interface';

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  user: null,

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
    const user: AuthUser = JSON.parse(storedUser);
    useAuthStore.getState().login(user);
  } else {
    useAuthStore.getState().logout();
  }
}

initializeUser();
