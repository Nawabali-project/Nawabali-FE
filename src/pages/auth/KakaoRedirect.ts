// import { instance } from '@/api/axios/axios';

const KakaoRedirect = () => {
  const code = new URL(window.location.href).searchParams.get('code');
  console.log('code: ', code);
  // async (code: string) => {
  //   try {
  //     const res = await instance.post('api/user/kakao/callback', {
  //       param: code,
  //     });
  //     return res;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
};

export default KakaoRedirect;
