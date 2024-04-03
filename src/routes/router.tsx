import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import Home from '@/pages/Home';
import KakaoCallBack from '@/pages/auth/KakaoCallBack';
import Myplace from '@/pages/user/Myplace';
import Mypage from '@/pages/user/Mypage';
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
        element: <KakaoCallBack />,
      },
      {
        path: '/myplace',
        element: <Myplace />,
      },
      {
        path: '/mypage',
        element: <Mypage />,
      },
      {
        path: '/main',
        element: <Main />,
      },
      // {
      //   path: '/login/oauth',
      //   element: <KakaoRedirectHandler />,
      // },
    ],
  },
]);
export default router;
