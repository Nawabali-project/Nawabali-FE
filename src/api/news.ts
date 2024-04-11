import { instance } from '../axios';
import { AxiosError } from 'axios';
import { ErrorResponse } from 'react-router-dom';

export const getPosts = async () => {
  try {
    const res = await instance.get('/posts');
    return res;
  } catch (error) {
    throw error as AxiosError<ErrorResponse>;
  }
};
