import axios from 'axios';
import { useEffect } from 'react';

const KakaoCallBack = () => {
  useEffect(() => {
    const params = new URL(document.location.toString()).searchParams;
    const code = params.get('code');
    const grant_type = 'authorization_code';
    const client_id = `${import.meta.env.VITE_KAKAO_RESTAPI_KEY}`;
    const REDIRECT_URI = `${import.meta.env.VITE_KAKAO_REDIRECT_URI}`;

    axios
      .post(
        `https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${client_id}&redirect_uri=${REDIRECT_URI}&code=${code}`,
        {},
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        },
      )
      .then((res) => {
        console.log(res);
        const { data } = res;
        const { access_token } = data;
        if (access_token) {
          console.log(`Bearer ${access_token}`);
          axios
            .post(
              'https://kapi.kakao.com/v2/user/me',
              {},
              {
                headers: {
                  Authorization: `Bearer ${access_token}`,
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
              },
            )
            .then((res) => {
              console.log('데이터 성공: ', res);
            });
        } else {
          console.log('access_tocken 없음');
        }
      });
  }, []);

  return <div></div>;
};
export default KakaoCallBack;
