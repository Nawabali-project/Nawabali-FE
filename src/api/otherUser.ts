import { authInstance } from '@/axios';

export const getOtherUsersContents = async (
  { pageParam }: { pageParam: number },
  userId?: number,
  category?: string,
) => {
  let endpoint = '/posts/user-nick?';

  let params = new URLSearchParams({
    page: String(pageParam),
    size: '10',
    sort: 'date,desc',
  });

  params.append('userId', String(userId));

  if (category) {
    params.append('category', category);
  }
  const response = await authInstance.get(`${endpoint}${params.toString()}`);

  return response.data;
};
