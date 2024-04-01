import { useEffect } from 'react';

const SocialKaKao = () => {
  const kakaoLoginImg = '/assets/images/kakaoLoginImg.png';

  const loginWithKakao = () => {
    const { Kakao } = window;
    Kakao.Auth.authorize({
      redirectUri: `${import.meta.env.VITE_APP_BASE_URL}/login/oauth`,
      scope: 'profile_nickname, account_email',
    });
  };

  useEffect(() => {
    const kakao = (window as any)?.Kakao;

    // 카카오 객체를 초기화 (필수)
    if (!kakao?.isInitialized()) {
      kakao?.init(import.meta.env.VITE_KAKAO_JS_KEY);
    }
  }, []);

  return (
    <>
      <button onClick={loginWithKakao}>
        <img src={kakaoLoginImg} alt="login with kakao" />
      </button>
    </>
  );
};

export default SocialKaKao;
