import { authInstance, instance } from './axios/axios';
import { AxiosError } from 'axios';
import { ErrorResponse } from 'react-router-dom';
import type {
  SignUpUser,
  LoginUser,
  VarifyCheck,
} from '@/interfaces/main/auth/auth.interface';

export const signUp = async (user: SignUpUser) => {
  try {
    const res = await instance.post('/users/signup', user);
    return res;
  } catch (error) {
    throw error as AxiosError<ErrorResponse>;
  }
};

export const login = async (user: LoginUser) => {
  try {
    const res = await authInstance.post('/users/login', user);
    return res.headers as any;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    if (axiosError.response) {
      const result = axiosError.response.data.status;
      return result;
    }
  }
};

export const sendVerificationCode = async (email: string) => {
  try {
    await instance.post(`/email-verification?email=${email}`);
  } catch (error) {
    throw error as AxiosError<ErrorResponse>;
  }
};

export const varifyNumberCheck = async (user: VarifyCheck) => {
  const { email, code } = user;
  try {
    const res = await instance.get(
      `/email-verification?email=${email}&code=${code}`,
    );
    const result = res.data;
    return result;
  } catch (error) {
    throw error as AxiosError<ErrorResponse>;
  }
};

export const nicknameDupCheck = async (nickname: string) => {
  try {
    const res = await instance.get(
      `/users/check-nickname?nickname=${nickname}`,
    );
    return res;
  } catch (error) {
    throw error as AxiosError<ErrorResponse>;
  }
};

export const logout = async () => {
  try {
    const res = await authInstance.post(`/users/logout`);
    return res;
  } catch (error) {
    throw error as AxiosError<ErrorResponse>;
  }
};
