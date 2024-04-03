import axios from 'axios';
import { Cookies } from 'react-cookie';

// 헤더가 필요 없는 인스턴스
export const instanceWithoutHeaders = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
});

// 헤더가 필요한 인스턴스
export const instanceWithToken = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    'content-type': 'application/json',
    accept: 'application/json',
    Authorization: `${new Cookies().get('accessToken')}`,
  },
});

// interceptor로 해야함
instanceWithToken.interceptors.request.use(
  (config) => {
    const token = `${new Cookies().get('accessToken')}`;
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
