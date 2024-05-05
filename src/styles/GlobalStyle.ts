import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`

@font-face {
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 100;
  src: url('/assets/font/Pretendard-Thin.woff2') format('woff2');
}
@font-face {
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 200;
  src: url('/assets/font/Pretendard-ExtraLight.woff2') format('woff2'),
}
@font-face {
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 300;
  src: url('/assets/font/Pretendard-Light.woff2') format('woff2'),
}
@font-face {
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  src: url('/assets/font/Pretendard-Regular.woff2') format('woff2'),
}
@font-face {
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  src: url('/assets/font/Pretendard-Medium.woff2') format('woff2'),
}
@font-face {
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 600;
  src: url('/assets/font/Pretendard-SemiBold.woff2') format('woff2'),
}
@font-face {
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 700;
  src: url('/assets/font/Pretendard-Bold.woff2') format('woff2'),
}
@font-face {
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 800;
  src: url('/assets/font/Pretendard-ExtraBold.woff2') format('woff2'),
}
@font-face {
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 900;
  src: url('/assets/font/Pretendard-Black.woff2') format('woff2'),
}



body {
  margin: 0;
  height: 100%;
  font-family: "Pretendard", "Noto Sans KR", sans-serif;
}

button{
  cursor: pointer;
}`;

export default GlobalStyles;
