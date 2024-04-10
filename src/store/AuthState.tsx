import { create } from 'zustand';
import { Cookies } from 'react-cookie';

interface AuthState {
  isLoggedIn: boolean;
  setLoginState: () => void;
  setLogoutState: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,

  setLoginState: () =>
    set(() => ({
      isLoggedIn: true,
    })),

  setLogoutState: () =>
    set(() => ({
      isLoggedIn: false,
    })),
}));

export default useAuthStore;

function initializeUser() {
  const cookie = new Cookies();
  const accessToken = cookie.get('accessToken');
  accessToken
    ? useAuthStore.getState().setLoginState()
    : useAuthStore.getState().setLogoutState();
}

initializeUser();
