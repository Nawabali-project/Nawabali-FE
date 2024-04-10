import useUserStore from '@/store/AuthState';

const useIsLoggedIn = () => {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  return isLoggedIn;
};

export default useIsLoggedIn;
