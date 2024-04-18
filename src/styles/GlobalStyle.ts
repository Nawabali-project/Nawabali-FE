import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
@font-face {
  font-family: 'Pretendard';
  src:
    url('/assets/font/Pretendard-Black.woff2') format('woff2'),
    url('/assets/font/Pretendard-Bold.woff2') format('woff2'),
    url('/assets/font/Pretendard-ExtraBold.woff2') format('woff2'),
    url('/assets/font/Pretendard-ExtraLight.woff2') format('woff2'),
    url('/assets/font/Pretendard-Light.woff2') format('woff2'),
    url('/assets/font/Pretendard-Medium.woff2') format('woff2'),
    url('/assets/font/Pretendard-Regular.woff2') format('woff2'),
    url('/assets/font/Pretendard-SemiBold.woff2') format('woff2'),
    url('/assets/font/Pretendard-Thin.woff2') format('woff2');
}

body {
  font-family: "Pretendard";
}

button{
    cursor: pointer;
}`;

export default GlobalStyles;
