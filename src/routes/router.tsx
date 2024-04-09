import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import KakaoRedirect from '@/pages/auth/KakaoRedirect';
import Myplace from '@/pages/mypage/Myplace';
import EditUser from '@/pages/mypage/EditUser';
import Mypage from '@/pages/mypage/Mypage';
import Main from '@/pages/Main';
// import KakaoRedirectHandler from '@/pages/KakaoRedirectHandler';

const router = createBrowserRouter([
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
        element: <Mypage />,
      },
    ],
  },
]);
export default router;
