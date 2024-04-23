import { ReactNode } from 'react';
import GlobalStyles from '@/styles/GlobalStyle';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import useIsLoggedIn from '@/hooks/useIsLoggedIn';
import App from '@/App';
import EditUser from '@/components/mypage/EditUser';
import Mypage from '@/pages/Mypage';
import ListPage from '@/pages/ListPage';
import MapPage from '@/pages/MapPage';
import NewsPage from '@/pages/NewsPage';
import ScorePage from '@/pages/ScorePage';
import ChatMain from '@/pages/ChatPage';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isLoggedIn = useIsLoggedIn();
  return isLoggedIn ? children : <Navigate to="/login" />;
};

export const router = createBrowserRouter([
  {
    element: (
      <>
        <GlobalStyles />
        <App />
      </>
    ),
    children: [
      {
        path: '/',
        element: <MapPage />,
      },
      {
        path: '/listpage',
        element: <ListPage />,
      },
      {
        path: '/newspage',
        element: <NewsPage />,
      },
      {
        path: '/scorepage',
        element: <ScorePage />,
      },
      {
        path: '/mypage/edit',
        element: <EditUser />,
      },
      {
        path: '/mypage',
        element: <Mypage />,
      },
      {
        path: '/chat',
        element: <ChatMain />,
      },
      {
        path: '/*',
        element: <MapPage />,
      },

      {
        path: '/mypage2',
        element: (
          <ProtectedRoute>
            <Mypage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
export default router;
