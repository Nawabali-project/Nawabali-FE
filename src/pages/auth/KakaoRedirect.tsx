import { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { authInstance } from '@/api/axios/axios';

const KakaoRedirect = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const CODE = new URLSearchParams(location.search).get('code');
  console.log('code:', CODE);

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
