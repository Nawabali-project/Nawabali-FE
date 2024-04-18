import { authInstance } from '@/axios';

export const getMyContents = async () => {
  const response = await authInstance.get(`/users/my-posts`);
  return response;
};

export const getMyBookMarks = async () => {
  const response = await authInstance.get(`/bookmarks/users`);
  return response;
};
