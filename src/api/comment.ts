import { authInstance } from '@/axios';

export const getComments = async ({
  pageParam,
  postId,
}: {
  pageParam: number;
  postId: string;
}) => {
  if (!postId) {
    console.error('postId is undefined!');
    return;
  }

  let params = {
    page: String(pageParam),
    size: '5',
    sort: ['string'],
  };

  let pageable = new URLSearchParams();
  pageable.append('page', params.page);
  pageable.append('size', params.size);
  params.sort.forEach((s) => pageable.append('sort', s));

  const response = await authInstance.get(
    `comments/check/posts/${postId}?${pageable.toString()}`,
  );
  console.log('getComments api 댓글들 가져오기 response: ', response);
  return response;
};

export const addComment = async (postId: number, newComment: string) => {
  try {
    const response = await authInstance.post(`/comments/posts/${postId}`, {
      contents: newComment,
    });
    return response.data;
  } catch (error: any) {
    console.log('addComment api 에러', error);
  }
};
