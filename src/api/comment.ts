import { authInstance, instance } from '@/axios';

// 댓글 모두 가져오기 (무한스크롤)
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

  const response = await instance.get(
    `comments/check/posts/${postId}?${pageable.toString()}`,
  );
  console.log('getComments api 댓글들 가져오기 response: ', response);
  return response;
};

// 댓글 추가
export const addComment = async (postId: number, newComment: string) => {
  const response = await authInstance.post(`/comments/posts/${postId}`, {
    contents: newComment,
  });
  return response.data;
};

// 댓글 수정
export const editComment = async (commentId: number, editedComment: string) => {
  await authInstance.patch(`/comments/${commentId}`, {
    contents: editedComment,
  });
};

// 댓글 삭제
export const deleteComment = async (commentId: number) => {
  await authInstance.delete(`/comments/${commentId}`);
};
