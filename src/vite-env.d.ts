interface ImportMetaEnv {
  //사용할 때는 import.meta.env.VITE_APP_URL로 접근 가능
  readonly VITE_APP_BASE_URL: string;
  readonly VITE_KAKAO_RESTAPI_KEY: string;
  readonly VITE_KAKAO_REDIRECT_URI: string;
}

interface Window {
  Kakao: any;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
