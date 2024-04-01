import { useEffect } from 'react';
import axios from 'axios';
import { instanceWithToken } from '@/apis/axios';

const KakaoRedirectHandler = () => {
  const { Kakao } = window;
  useEffect(() => {
    const params = new URL(document.location.toString()).searchParams;
    const code = params.get('code');
    const grant_type = 'authorization_code';
    const client_id = import.meta.env.VITE_KAKAO_RESTAPI_KEY;
    axios
      .post(
        `https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${client_id}&redirect_uri=${import.meta.env.VITE_APP_BASE_URL}/login/oauth&code=${code}`,
        null, // Removed data parameter
        {
          headers: {
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        },
      )
      .then((res) => {
        console.log(res);
        Kakao.Auth.setAccessToken(res.data.access_token);
        Kakao.API.request({
          url: '/v2/user/me',
          success: function (response: any) {
            console.log(response);
          },
          fail: function (error: any) {
            console.log(error);
          },
        });
        instanceWithToken
          .post('/api/user/account/login/kakao', {
            accessToken: res.data.access_token,
          })
          .then((res) => {
            console.log(res);
          });
      });
  }, []);

  return <div>kakao login 완료</div>;
};

export default KakaoRedirectHandler;
