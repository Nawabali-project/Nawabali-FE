import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import Home from '@/pages/Home';
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
