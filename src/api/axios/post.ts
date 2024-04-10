import { authInstance, instance } from './../api/axios/axios';

export const getPosts = async ({ pageParam }: { pageParam: number }) => {
  let params = {
    page: String(pageParam),
    size: '10',
    sort: ['string'],
  };

  let pageable = new URLSearchParams();
  pageable.append('page', params.page);
  pageable.append('size', params.size);
  params.sort.forEach((s) => pageable.append('sort', s));

  const response = await instance.get(`/posts?${pageable.toString()}`);
  console.log('포스트들 가져오기v1 getPosts api');
  console.log(response);
  return response;
};

// export const getPosts = async (page = 0) => {
//   const response = await instance.get(`/posts?page=${page}`);
//   console.log('포스트들 가져오기v2 getPosts api');
//   console.log(response.data);
//   return response.data;
// };

export const createPost = async (newPost: FormData) => {
  console.log('새로운 포스트 생성 createPost api');
  await authInstance.post('/posts', newPost);
};
