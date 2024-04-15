import { ReactNode } from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import KakaoRedirect from '@/components/auth/KakaoRedirect';
import Myplace from '@/components/mypage/Myplace';
import EditUser from '@/components/mypage/EditUser';
import Mypage from '@/components/mypage/Mypage';
import Main from '@/pages/Main';
import useIsLoggedIn from '@/hooks/useIsLoggedIn';

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
        element: <Main />,
      },
      {
        path: '/api/user/kakao/callback',
        element: <KakaoRedirect />,
      },
      {
        path: '/myplace',
        element: <Myplace />,
      },
      {
        path: '/mypage/edit',
        element: <EditUser />,
      },
      {
        path: '/mypage',
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
