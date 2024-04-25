import useAuthStore from '@/store/AuthState';

const useIsLoggedIn = () => {
  return useAuthStore((state) => state.isLoggedIn);
};

export default useIsLoggedIn;
