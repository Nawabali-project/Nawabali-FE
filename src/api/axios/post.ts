import { authInstance, instance } from './axios';

// export const getPosts = async () => {
//   const response = await instance.get('/posts');
//   console.log('포스트들 가져오기');
//   console.log(response);
//   return response;
// };

export const getPosts = async (page = 0) => {
  const response = await instance.get(`/posts?page=${page}`);
  console.log('포스트들 가져오기 getPosts api');
  console.log(response.data);
  return response.data;
};

export const createPost = async (newPost: any) => {
  console.log('새로운 포스트 생성 createPost api');
  console.log(newPost);
  await authInstance.post('/posts', newPost);
};
