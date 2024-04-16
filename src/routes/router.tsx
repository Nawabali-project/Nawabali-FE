import { ReactNode } from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import Myplace from '@/components/mypage/Myplace';
import EditUser from '@/components/mypage/EditUser';
import Mypage from '@/components/mypage/Mypage';
import useIsLoggedIn from '@/hooks/useIsLoggedIn';
import ListPage from '@/pages/ListPage';
import MapPage from '@/pages/MapPage';
import NewsPage from '@/pages/NewsPage';
import ScorePage from '@/pages/ScorePage';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isLoggedIn = useIsLoggedIn();
  return isLoggedIn ? children : <Navigate to="/login" />;
};

export const router = createBrowserRouter([
  {
    element: <App />,
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
        path: '/myplace',
        element: <Myplace />,
      },
      {
        path: '/edit',
        element: <EditUser />,
      },
      {
        path: '/mypage',
        element: <Mypage />,
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
