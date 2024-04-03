const SocialKaKao = () => {
  const kakaoLoginImg = '/assets/images/kakaoLoginImg.png';

  const loginWithKakao = () => {
    const REDIRECT_URI = `${import.meta.env.VITE_KAKAO_REDIRECT_URI}`;
    const CLIENT_ID = `${import.meta.env.VITE_KAKAO_RESTAPI_KEY}`;
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <>
      <img
        src={kakaoLoginImg}
        alt="login with kakao"
        onClick={loginWithKakao}
        style={{ cursor: 'pointer' }}
      />
    </>
  );
};
export default SocialKaKao;
