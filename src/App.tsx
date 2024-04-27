import { Outlet, useNavigate } from 'react-router-dom';
import Header from './components/header/Header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useAuthStore, { SSEListener } from './store/AuthState';
import { useEffect } from 'react';

const queryClient = new QueryClient();

function App() {
  const { initializeLoginState, isLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    initializeLoginState();
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate, initializeLoginState]);

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      {isLoggedIn && <SSEListener />}
      <Outlet />
    </QueryClientProvider>
  );
}

export default App;
