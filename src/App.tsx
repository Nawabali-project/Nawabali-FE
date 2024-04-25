import { Outlet } from 'react-router-dom';
import Header from './components/header/Header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useAuthStore from './store/AuthState';
import { useEffect } from 'react';

const queryClient = new QueryClient();

function App() {
  const { initializeLoginState } = useAuthStore();

  useEffect(() => {
    initializeLoginState();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Outlet />
    </QueryClientProvider>
  );
}

export default App;
