import { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { authInstance } from '@/api/axios/axios';

const KakaoRedirect = () => {
  const navigate = useNavigate();
  // const PARAMS = new URL(window.location.href).searchParams;
  // const CODE = PARAMS.get('code');
  const location = useLocation();
  const CODE = new URLSearchParams(location.search).get('code');
  console.log('code:', CODE);
  // const [accessTokenFetching, setAccessTokenFetching] = useState(false);

  // const getAccessToken = async () => {
  //   if (accessTokenFetching) return;

  //   console.log('getAccessToken 호출');

  //   try {
  //     setAccessTokenFetching(true);

  //     const response = await axios.get(
  //       `${import.meta.env.VITE_KAKAO_REDIRECT_URI}?code=${CODE}`,
  //     );
  //     console.log('나 황형이야~', response);
  //     const accessToken = response.headers.authorization;
  //     console.log('accessToken:', accessToken);
  //     const saveTokensToLocalStorage = (token: string) => {
  //       localStorage.setItem('accessToken', token);
  //     };
  //     saveTokensToLocalStorage(accessToken);
  //     setAccessTokenFetching(false);
  //     navigate('/');
  //   } catch (error) {
  //     console.error('Error:', error);
  //     setAccessTokenFetching(false);
  //   }
  // };

  // useEffect(() => {
  //   if (CODE) {
  //     getAccessToken();
  //   }
  // }, [CODE]);

  const sendAuthorizationCode = useCallback(() => {
    authInstance
      .get(`/api/user/kakao/callback`, {
        params: {
          code: CODE,
        },
      })
      .then((res) => {
        window.localStorage.setItem('access_Token', res.data.Authorization);
        navigate('/');
        console.log('카카오 로그인에 성공하였습니다.');
      })
      .catch((err) => {
        console.error('카카오 로그인에 실패하였습니다.', err);
      });
  }, [CODE, navigate]);

  useEffect(() => {
    if (location.search) {
      sendAuthorizationCode();
    }
  }, [location.search, sendAuthorizationCode]);

  return null;
};

export default KakaoRedirect;
