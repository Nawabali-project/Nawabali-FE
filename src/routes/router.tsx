import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import Home from '@/pages/Home';
import KakaoRedirect from '@/pages/auth/KakaoRedirect';
import Myplace from '@/pages/user/Myplace';
import EditUser from '@/pages/user/Mypage';
import Mypage from '@/pages/user/EditUser';
import Main from '@/pages/Main';
// import KakaoRedirectHandler from '@/pages/KakaoRedirectHandler';

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login/oauth',
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
      {
        path: '/main',
        element: <Main />,
      },
    ],
  },
]);
export default router;
