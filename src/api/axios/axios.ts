import axios from 'axios';
// import { Cookies } from 'react-cookie';

// const cookie = new Cookies();

export const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
});

export const authInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  withCredentials: true,
});

// authInstance.interceptors.request.use(
//   (config) => {
//     const accessToken = cookie.get('accessToken');
//     if (accessToken) {
//       config.headers['Authorization'] = `${accessToken}`;
//     } else {
//       delete config.headers['Authorization'];
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );
