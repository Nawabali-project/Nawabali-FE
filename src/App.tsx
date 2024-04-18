import { Outlet } from 'react-router-dom';
import Header from './components/header/Header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import useAuthStore from './store/AuthState';
// import { useEffect } from 'react';
// import { Cookies } from 'react-cookie';

const queryClient = new QueryClient();

function App() {
  // const cookie = new Cookies();
  // const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);

  // useEffect(() => {
  //   const token = cookie.get('accessToken');
  //   setIsLoggedIn(!!token);
  // }, [setIsLoggedIn]);
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Outlet />
    </QueryClientProvider>
  );
}

export default App;
