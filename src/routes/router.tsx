import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import Home from '@/pages/Home';
import KakaoCallBack from '@/pages/auth/KakaoCallBack';
import Myplace from '@/pages/user/Myplace';

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
    ],
  },
]);
export default router;
