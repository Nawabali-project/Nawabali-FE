const KakaoRedirect = () => {
  const code = new URL(window.location.href).searchParams.get('code');
  console.log(code);
  return code;
};

export default KakaoRedirect;
