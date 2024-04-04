import { authInstance, instance } from '../axios/axios';
import { AxiosError } from 'axios';
import { ErrorResponse } from 'react-router-dom';
import type {
  SignUpUser,
  LoginUser,
  DuplicateCheck,
} from '@/interfaces/user/user.interface';

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
    return res;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    if (axiosError.response) {
      const result = axiosError.response.data.status;
      return result;
    }
  }
};

export const duplicateTest = async (email: string) => {
  try {
    const res = await instance.get(`/email-verification?email=${email}`);
    const result = res.data.data.isExist;
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const duplicateCheck = async (user: DuplicateCheck) => {
  const { email, code } = user;
  try {
    const res = await instance.get(
      `/email-verification?email=${email}&code=${code}`,
    );
    const result = res.data.data.isExist;
    return result;
  } catch (error) {
    console.log(error);
  }
};

// export const logout = async () => {
//   try {
//     const res = await authInstance.post(`/users/?userId=${userId}`);
//     return res;
//   } catch (error) {
//     console.log(error);
//   }
// };
