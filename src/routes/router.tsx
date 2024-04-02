import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import Home from '@/pages/Home';
import KakaoCallBack from '@/pages/auth/KakaoCallBack';
import Mypage from '@/pages/user/Mypage';

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
        path: '/mypage',
        element: <Mypage />,
      },
    ],
  },
]);
export default router;
